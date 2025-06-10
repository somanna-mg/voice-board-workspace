# **🎤 Whisper STT Service - Product Requirements Document (PRD)**

## **📋 Executive Summary**

We're building a local speech-to-text (STT) service that converts voice recordings into text for the Voice Board teaching tool. Think of it as your personal transcription assistant that runs entirely on your computer - no internet needed!

**Why are we building this?**
- Teachers need to create teaching materials quickly using voice commands
- Cloud STT services are expensive and require internet
- Privacy matters - audio should never leave your computer
- We want sub-second response times for a smooth experience

---

## **🎯 What We're Building**

### **The Big Picture**

Imagine you're a teacher creating a lesson about arrays. Instead of clicking and typing, you simply say:
> *"Create an array with 5 elements"*

Our STT service is the first step - it converts your voice into text that our system can understand.

### **Core Functionality**

1. **Listen** → Accept audio from your microphone or browser
2. **Convert** → Transform speech into accurate text using OpenAI's Whisper AI model
3. **Respond** → Return the text in under 700 milliseconds
4. **Scale** → Handle multiple requests without slowing down

---

## **🤔 Key Decisions & Why We Made Them**

### **Decision 1: Local-First Architecture**

**What we chose**: Run everything on your computer
**Why**: 
- 🔒 **Privacy**: Your voice never leaves your machine
- 💰 **Cost**: No per-request API fees
- ⚡ **Speed**: No network latency
- 🌐 **Offline**: Works without internet

**Trade-off**: Users need to install software (worth it for privacy/speed)

### **Decision 2: Whisper with small.en Model**

**What we chose**: OpenAI's Whisper `small.en` model (244MB)
**Why**:
- ✅ 95%+ accuracy for everyday English
- ✅ Fast enough for real-time use
- ✅ Proven technology (millions of users)
- ✅ Free and open-source

**Why not tiny/base?**: Too many errors on teaching terminology
**Why not medium/large?**: Too slow for interactive use

### **Decision 3: Microservice Architecture**

**What we chose**: Separate STT service on port 5174
**Why**:
- 🔧 Can update STT without touching main app
- 🚀 Can scale independently
- 🧪 Easier to test in isolation
- 🔄 Can swap implementations later

**Alternative rejected**: Embedding in web app (too heavy, platform-specific)

### **Decision 4: Hardware Acceleration**

**What we chose**: Auto-detect and use GPU when available
**Why**:
- 🏎️ 2-3x faster with GPU
- 🔄 Falls back to CPU automatically
- 👥 Works for everyone (GPU users get speed boost)

---

## **📐 Technical Architecture**

### **System Overview**

```
Your Computer:
┌─────────────────────────────────────┐
│   Chrome/Firefox/Safari             │
│   📱 Voice Board Web App            │
│   (localhost:3000)                  │
└────────────┬────────────────────────┘
             │ HTTP/WebSocket
             ▼
┌─────────────────────────────────────┐
│   🎤 STT Service                    │
│   (localhost:5174)                  │
│   ├── Express.js Server            │
│   ├── Whisper.cpp Engine           │
│   ├── Audio Processor (FFmpeg)     │
│   └── Worker Pool Manager          │
└─────────────────────────────────────┘
```

### **Request Flow**

1. **User speaks** into microphone
2. **Browser records** audio (WebM format usually)
3. **Uploads to STT** service via HTTP POST
4. **FFmpeg converts** to standard format (16kHz WAV)
5. **Whisper processes** using optimal hardware (GPU/CPU)
6. **Text returned** to browser
7. **Command Router** interprets the text (separate service)

---

## **🛠️ Feature Specifications**

### **Feature 1: Audio Processing Pipeline**

**Goal**: Accept any common audio format and standardize it

**How it works**:
```
Input Audio → FFmpeg → 16kHz Mono WAV → Whisper
(any format)           (standard format)
```

**Supported formats**:
- ✅ WebM/Opus (browser default)
- ✅ WAV (uncompressed)
- ✅ MP3 (compressed)
- ✅ M4A/AAC (Apple devices)
- ✅ OGG (open source)

**Why FFmpeg?**: Industry standard, handles everything

### **Feature 2: Smart Hardware Detection**

**Goal**: Use the fastest available hardware automatically

**Detection order**:
1. Check for NVIDIA GPU → Use CUDA acceleration
2. Check for Apple Silicon → Use Metal acceleration  
3. Check for AMD GPU → Use ROCm if available
4. Fallback → Use CPU with SIMD optimizations

**User experience**: It just works - no configuration needed!

### **Feature 3: Concurrent Processing**

**Goal**: Handle multiple users/requests simultaneously

**Implementation**:
- **Worker pool** with N processes (N = CPU cores / 2)
- **Queue system** prevents overload
- **Request timeout** after 2 minutes
- **Graceful degradation** when busy

**Example**: 4-core CPU = 2 whisper workers running in parallel

### **Feature 4: Result Caching**

**Goal**: Don't process the same audio twice

**How it works**:
- Hash audio content → Use as cache key
- Store text result for 2 minutes
- Instant response for duplicate requests

**Why cache?**: Teachers often repeat commands

---

## **📊 Performance Requirements**

### **Latency Targets**

| Audio Length | Target | Why This Matters |
|--------------|--------|------------------|
| 5 seconds | ≤ 700ms | Feels instant to users |
| 10 seconds | ≤ 1.4s | Still interactive |
| 30 seconds | ≤ 4.2s | Max supported length |

### **Accuracy Targets**

| Content Type | Target | Example |
|--------------|--------|---------|
| Simple commands | 98%+ | "create an array" |
| Technical terms | 95%+ | "binary search tree" |
| Full sentences | 93%+ | Complex explanations |

### **Resource Usage**

- **RAM**: ~500MB base + 300MB per worker
- **CPU**: 50-100% during processing (brief spikes)
- **Disk**: 250MB for model + temp files
- **Network**: None (fully local!)

---

## **🚦 API Specification**

### **Health Check Endpoint**

```
GET /health

Response:
{
  "status": "healthy",
  "version": "1.0.0",
  "model": "small.en",
  "hardware": "NVIDIA GPU (CUDA)",
  "workers": 2,
  "queue": 0
}
```

### **Transcription Endpoint**

```
POST /api/whisper
Content-Type: multipart/form-data

Fields:
- audio: File (required) - Audio file to transcribe
- language: String (optional) - Always "en" for now

Response:
{
  "text": "Create an array with five elements",
  "confidence": 0.95,
  "duration": 487,  // milliseconds
  "cached": false
}
```

### **Error Responses**

```json
// Audio too long
{
  "error": "Audio duration exceeds maximum (45s > 30s)",
  "code": "AUDIO_TOO_LONG"
}

// Service busy
{
  "error": "Service temporarily unavailable - queue full",
  "code": "QUEUE_FULL"
}
```

---

## **🎮 User Experience**

### **Installation Flow**

1. **Download installer** for your platform (Mac/Windows)
2. **Run installer** 
   - Installs service files
   - Downloads Whisper model (one-time, 244MB)
   - Sets up auto-start
3. **Service starts** automatically
4. **Open web app** - voice features work immediately!

### **Daily Usage**

- Service runs in background (like Dropbox)
- System tray/menu bar icon shows status
- No configuration needed
- Automatic updates (future feature)

### **First-Time Setup Time**

- Download installer: 1 minute (10MB)
- Install service: 30 seconds
- Download model: 2-5 minutes (244MB)
- **Total**: Under 7 minutes to voice-enabled!

---

## **🔒 Security & Privacy**

### **Data Handling**

- ✅ Audio files deleted immediately after processing
- ✅ No logs contain audio content
- ✅ Result cache only stores text (not audio)
- ✅ All processing happens locally

### **Network Security**

- Service only listens on localhost (not exposed to network)
- No external API calls
- No telemetry or usage tracking

---

## **🏗️ Implementation Priorities**

### **Phase 1: Core Functionality (Week 1)**
- Basic Express server
- Whisper integration (CPU only)
- File upload support
- Simple health check

### **Phase 2: Production Ready (Week 2)**
- GPU acceleration
- Worker pool for concurrency  
- Result caching
- Error handling

### **Phase 3: Polish (Week 3)**
- Platform installers
- System tray integration
- Performance monitoring
- Comprehensive testing

---

## **❓ FAQs for Developers**

**Q: Why not use browser's Web Speech API?**
- A: Requires internet, sends data to Google/Apple, less accurate for technical terms

**Q: Why TypeScript instead of Python?**
- A: Matches our monorepo stack, better for long-running services, easier deployment

**Q: Can we add more languages later?**
- A: Yes! Just switch from `small.en` to `small` model (supports 99 languages)

**Q: What if Whisper gets outdated?**
- A: Service architecture allows swapping to any STT engine without changing API

**Q: How do we handle accents?**
- A: Whisper small.en handles most English accents well; can fine-tune later if needed

---

## **✅ Success Metrics**

### **Technical Success**
- ✅ 95%+ requests under 700ms (5-second audio)
- ✅ 99%+ accuracy on basic commands
- ✅ Zero network requests during operation
- ✅ Handles 10+ concurrent requests

### **User Success**
- ✅ Setup in under 10 minutes
- ✅ Works immediately (no configuration)
- ✅ Transparent operation (users forget it's there)
- ✅ No monthly fees

---

## **🚀 Future Enhancements (Post-MVP)**

1. **Streaming transcription** - Real-time text as you speak
2. **Speaker diarization** - Identify who's speaking
3. **Custom vocabulary** - Add technical terms specific to curriculum
4. **Cloud hybrid mode** - Optional cloud fallback for older machines
5. **Multi-language support** - Switch to multilingual model

---

## **📝 Summary**

We're building a local STT service that's:
- **Fast** (under 700ms response)
- **Private** (fully local)
- **Accurate** (95%+ on technical content)
- **Simple** (works out of the box)

This forms the foundation of our voice-driven teaching tool, converting speech to text that our command system can understand.

---

**PRD OK to task-plan? (yes / revise)**

Need clarification on any section? Want me to expand on any technical decision?