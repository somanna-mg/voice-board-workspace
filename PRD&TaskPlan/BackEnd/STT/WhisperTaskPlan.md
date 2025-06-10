# **📋 Whisper STT Service - Granular Implementation Task Plan**

## **🎯 Development Approach**

**Test-Driven Development (TDD) Cycle**:
1. Write failing tests first
2. Implement minimal code to pass tests
3. Refactor while keeping tests green
4. Move to next task

**Each task includes**:
- 📝 Description
- ✅ Acceptance Criteria (AC)
- 🧪 Required Tests
- 🔗 Dependencies

---

## **Phase 1: Foundation Setup (Day 1-2)**

### **Task 1.1: Initialize STT Package**

**📝 Description**: Create the STT service package in the monorepo with TypeScript configuration

**✅ Acceptance Criteria**:
- Package exists at `packages/backend/stt-service`
- TypeScript compiles without errors
- Package.json has correct name: `@voice-board/stt-service`
- Scripts work: `dev`, `build`, `test`

**🧪 Required Tests**:
```typescript
// setup.test.ts
describe('Package Setup', () => {
  test('package.json exists with correct name', () => {
    const pkg = require('../package.json');
    expect(pkg.name).toBe('@voice-board/stt-service');
  });
  
  test('TypeScript config is valid', () => {
    const { execSync } = require('child_process');
    expect(() => execSync('npm run build')).not.toThrow();
  });
});
```

---

### **Task 1.2: Environment Configuration Module**

**📝 Description**: Create configuration management with validation

**✅ Acceptance Criteria**:
- Config loads from environment variables
- Validates required variables on startup
- Provides type-safe config object
- Supports .env files for development

**🧪 Required Tests**:
```typescript
// src/config/config.test.ts
describe('Configuration', () => {
  test('loads default configuration', () => {
    const config = loadConfig();
    expect(config.port).toBe(5174);
    expect(config.maxAudioDuration).toBe(30);
    expect(config.whisperModel).toBe('small.en');
  });
  
  test('validates required environment variables', () => {
    delete process.env.WHISPER_MODEL_PATH;
    expect(() => loadConfig()).toThrow('WHISPER_MODEL_PATH is required');
  });
  
  test('overrides defaults with env vars', () => {
    process.env.PORT = '6000';
    const config = loadConfig();
    expect(config.port).toBe(6000);
  });
});
```

---

### **Task 1.3: Express Server Setup**

**📝 Description**: Create basic Express server with middleware

**✅ Acceptance Criteria**:
- Server starts on configured port
- Health endpoint responds
- CORS enabled for local development
- Request logging implemented
- Graceful shutdown handling

**🧪 Required Tests**:
```typescript
// src/server.test.ts
describe('Express Server', () => {
  let server: Server;
  
  beforeAll(async () => {
    server = await createServer();
  });
  
  afterAll(async () => {
    await server.close();
  });
  
  test('health endpoint returns 200', async () => {
    const res = await request(server).get('/health');
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('status', 'healthy');
  });
  
  test('handles CORS headers', async () => {
    const res = await request(server).get('/health');
    expect(res.headers['access-control-allow-origin']).toBeDefined();
  });
  
  test('logs requests', async () => {
    const logSpy = jest.spyOn(logger, 'info');
    await request(server).get('/health');
    expect(logSpy).toHaveBeenCalledWith(
      expect.stringContaining('GET /health')
    );
  });
});
```

---

### **Task 1.4: Structured Logging Setup**

**📝 Description**: Implement Pino logger with proper formatting

**✅ Acceptance Criteria**:
- Structured JSON logs in production
- Pretty formatted logs in development
- Log levels configurable via env
- Request ID tracking

**🧪 Required Tests**:
```typescript
// src/utils/logger.test.ts
describe('Logger', () => {
  test('logs JSON in production', () => {
    process.env.NODE_ENV = 'production';
    const logger = createLogger();
    const output = captureStdout(() => {
      logger.info('test message');
    });
    expect(JSON.parse(output)).toHaveProperty('msg', 'test message');
  });
  
  test('includes request ID in context', () => {
    const logger = createLogger({ requestId: 'test-123' });
    const output = captureStdout(() => {
      logger.info('test');
    });
    expect(JSON.parse(output)).toHaveProperty('requestId', 'test-123');
  });
});
```

---

## **Phase 2: Audio Processing Pipeline (Day 3-4)**

### **Task 2.1: File Upload Handling**

**📝 Description**: Implement Multer for multipart file uploads

**✅ Acceptance Criteria**:
- Accepts multipart/form-data POST requests
- Validates file size (max 10MB)
- Accepts only audio MIME types
- Returns 400 for invalid uploads
- Stores files in temp directory

**🧪 Required Tests**:
```typescript
// src/middleware/upload.test.ts
describe('File Upload', () => {
  test('accepts valid audio file', async () => {
    const res = await request(app)
      .post('/api/whisper')
      .attach('audio', 'test-fixtures/sample.wav')
      .field('language', 'en');
    expect(res.status).toBe(200);
  });
  
  test('rejects non-audio files', async () => {
    const res = await request(app)
      .post('/api/whisper')
      .attach('audio', 'test-fixtures/document.pdf');
    expect(res.status).toBe(400);
    expect(res.body.error).toContain('Invalid audio format');
  });
  
  test('rejects files over 10MB', async () => {
    const largeBuffer = Buffer.alloc(11 * 1024 * 1024);
    const res = await request(app)
      .post('/api/whisper')
      .attach('audio', largeBuffer, 'large.wav');
    expect(res.status).toBe(413);
  });
});
```

---

### **Task 2.2: Audio Format Validation**

**📝 Description**: Validate audio files by checking magic bytes

**✅ Acceptance Criteria**:
- Checks file headers (not just extension)
- Supports WAV, MP3, WebM, OGG, M4A
- Rejects fake/corrupted files
- Provides clear error messages

**🧪 Required Tests**:
```typescript
// src/validators/audio.test.ts
describe('Audio Validation', () => {
  test('validates WAV magic bytes', () => {
    const wavHeader = Buffer.from('RIFF....WAVE', 'ascii');
    expect(isValidAudioFormat(wavHeader)).toBe(true);
  });
  
  test('validates MP3 magic bytes', () => {
    const mp3Header = Buffer.from([0xFF, 0xFB]);
    expect(isValidAudioFormat(mp3Header)).toBe(true);
  });
  
  test('rejects invalid magic bytes', () => {
    const fakeHeader = Buffer.from('FAKE', 'ascii');
    expect(isValidAudioFormat(fakeHeader)).toBe(false);
  });
  
  test('detects format from buffer', () => {
    const webmHeader = Buffer.from([0x1A, 0x45, 0xDF, 0xA3]);
    expect(detectAudioFormat(webmHeader)).toBe('webm');
  });
});
```

---

### **Task 2.3: FFmpeg Audio Conversion**

**📝 Description**: Convert any audio format to 16kHz mono WAV

**✅ Acceptance Criteria**:
- Converts all supported formats to WAV
- Output is exactly 16kHz sample rate
- Output is mono (1 channel)
- Handles errors gracefully
- Cleans up temp files

**🧪 Required Tests**:
```typescript
// src/services/audio-converter.test.ts
describe('Audio Conversion', () => {
  test('converts MP3 to 16kHz mono WAV', async () => {
    const inputPath = 'test-fixtures/sample.mp3';
    const outputPath = await convertToWav(inputPath);
    
    const metadata = await getAudioMetadata(outputPath);
    expect(metadata.sampleRate).toBe(16000);
    expect(metadata.channels).toBe(1);
    expect(metadata.format).toBe('wav');
  });
  
  test('handles conversion errors', async () => {
    const corruptPath = 'test-fixtures/corrupt.mp3';
    await expect(convertToWav(corruptPath))
      .rejects.toThrow('Audio conversion failed');
  });
  
  test('cleans up temp files on error', async () => {
    const inputPath = 'test-fixtures/corrupt.mp3';
    const tempDir = getTempDir();
    const filesBefore = fs.readdirSync(tempDir).length;
    
    try {
      await convertToWav(inputPath);
    } catch {}
    
    const filesAfter = fs.readdirSync(tempDir).length;
    expect(filesAfter).toBe(filesBefore);
  });
});
```

---

### **Task 2.4: Audio Duration Validation**

**📝 Description**: Check audio duration before processing

**✅ Acceptance Criteria**:
- Extracts duration using FFprobe
- Rejects audio over 30 seconds
- Returns duration in error message
- Works with all supported formats

**🧪 Required Tests**:
```typescript
// src/validators/duration.test.ts
describe('Duration Validation', () => {
  test('accepts audio under 30 seconds', async () => {
    const duration = await getAudioDuration('test-fixtures/short.wav');
    expect(duration).toBe(5.0);
    expect(() => validateDuration(duration)).not.toThrow();
  });
  
  test('rejects audio over 30 seconds', async () => {
    const duration = await getAudioDuration('test-fixtures/long.wav');
    expect(duration).toBe(45.0);
    expect(() => validateDuration(duration))
      .toThrow('Audio duration exceeds maximum (45s > 30s)');
  });
  
  test('handles invalid audio files', async () => {
    await expect(getAudioDuration('test-fixtures/corrupt.wav'))
      .rejects.toThrow('Failed to read audio duration');
  });
});
```

---

## **Phase 3: Whisper Integration (Day 5-7)**

### **Task 3.1: Whisper Binary Management**

**📝 Description**: Download and validate whisper.cpp binary

**✅ Acceptance Criteria**:
- Downloads correct binary for platform
- Verifies binary checksum
- Makes binary executable
- Handles download failures
- Shows progress during download

**🧪 Required Tests**:
```typescript
// src/services/whisper-setup.test.ts
describe('Whisper Setup', () => {
  test('downloads binary for current platform', async () => {
    const binaryPath = await downloadWhisperBinary();
    expect(fs.existsSync(binaryPath)).toBe(true);
    expect(fs.statSync(binaryPath).mode & 0o111).toBeTruthy(); // executable
  });
  
  test('verifies binary checksum', async () => {
    const binaryPath = await downloadWhisperBinary();
    const isValid = await verifyChecksum(binaryPath, CHECKSUMS[process.platform]);
    expect(isValid).toBe(true);
  });
  
  test('retries on download failure', async () => {
    // Mock network failure
    nock('https://github.com')
      .get(/whisper-releases/)
      .reply(500)
      .get(/whisper-releases/)
      .reply(200, binaryContent);
    
    const binaryPath = await downloadWhisperBinary();
    expect(fs.existsSync(binaryPath)).toBe(true);
  });
});
```

---

### **Task 3.2: Model Download and Management**

**📝 Description**: Download and cache Whisper small.en model

**✅ Acceptance Criteria**:
- Downloads model from Hugging Face
- Shows progress percentage
- Verifies model integrity
- Caches in user data directory
- Skips if already downloaded

**🧪 Required Tests**:
```typescript
// src/services/model-manager.test.ts
describe('Model Management', () => {
  test('downloads small.en model', async () => {
    const modelPath = await downloadModel('small.en');
    expect(fs.existsSync(modelPath)).toBe(true);
    expect(fs.statSync(modelPath).size).toBe(244 * 1024 * 1024); // 244MB
  });
  
  test('uses cached model if exists', async () => {
    // First download
    await downloadModel('small.en');
    
    // Second should be instant (cached)
    const start = Date.now();
    await downloadModel('small.en');
    const duration = Date.now() - start;
    expect(duration).toBeLessThan(100); // Should be instant
  });
  
  test('reports download progress', async () => {
    const progress: number[] = [];
    await downloadModel('small.en', (pct) => progress.push(pct));
    
    expect(progress.length).toBeGreaterThan(5);
    expect(progress[0]).toBeLessThan(progress[progress.length - 1]);
    expect(progress[progress.length - 1]).toBe(100);
  });
});
```

---

### **Task 3.3: Whisper Process Wrapper**

**📝 Description**: Create Node.js wrapper for whisper.cpp binary

**✅ Acceptance Criteria**:
- Spawns whisper process correctly
- Passes correct arguments
- Captures output properly
- Handles process errors
- Implements timeout

**🧪 Required Tests**:
```typescript
// src/services/whisper-wrapper.test.ts
describe('Whisper Wrapper', () => {
  test('executes whisper with correct arguments', async () => {
    const spy = jest.spyOn(child_process, 'spawn');
    await runWhisper('audio.wav', { model: 'small.en', language: 'en' });
    
    expect(spy).toHaveBeenCalledWith('./whisper-main', [
      '-m', 'models/small.en.bin',
      '-f', 'audio.wav',
      '-l', 'en',
      '-otxt',
      '-np',  // no timestamps
      '-pc'   // print confidence
    ]);
  });
  
  test('parses whisper output correctly', async () => {
    const result = await runWhisper('test-fixtures/hello.wav');
    expect(result.text).toBe('Hello, this is a test');
    expect(result.confidence).toBeGreaterThan(0.8);
  });
  
  test('handles timeout', async () => {
    await expect(
      runWhisper('test-fixtures/long.wav', { timeout: 100 })
    ).rejects.toThrow('Whisper process timeout');
  });
});
```

---

### **Task 3.4: Hardware Detection**

**📝 Description**: Detect GPU and select optimal whisper binary

**✅ Acceptance Criteria**:
- Detects NVIDIA GPU on Windows/Linux
- Detects Metal on macOS
- Falls back to CPU gracefully
- Logs selected acceleration
- Handles detection errors

**🧪 Required Tests**:
```typescript
// src/services/hardware-detector.test.ts
describe('Hardware Detection', () => {
  test('detects NVIDIA GPU on Windows', async () => {
    // Mock nvidia-smi output
    jest.spyOn(child_process, 'exec')
      .mockResolvedValue({ stdout: 'NVIDIA GeForce RTX 3080' });
    
    const hardware = await detectHardware();
    expect(hardware.gpu).toBe('nvidia');
    expect(hardware.binary).toBe('whisper-cuda.exe');
  });
  
  test('detects Apple Silicon', async () => {
    Object.defineProperty(process, 'platform', { value: 'darwin' });
    jest.spyOn(os, 'cpus').mockReturnValue([{ model: 'Apple M1' }]);
    
    const hardware = await detectHardware();
    expect(hardware.gpu).toBe('metal');
    expect(hardware.binary).toBe('whisper-metal');
  });
  
  test('falls back to CPU', async () => {
    jest.spyOn(child_process, 'exec')
      .mockRejectedValue(new Error('nvidia-smi not found'));
    
    const hardware = await detectHardware();
    expect(hardware.gpu).toBe('cpu');
    expect(hardware.binary).toContain('whisper-cpu');
  });
});
```

---

## **Phase 4: Worker Pool & Concurrency (Day 8-9)**

### **Task 4.1: Worker Pool Implementation**

**📝 Description**: Create pool of whisper processes for concurrent processing

**✅ Acceptance Criteria**:
- Spawns N worker processes
- Distributes jobs round-robin
- Handles worker crashes
- Implements job queue
- Graceful shutdown

**🧪 Required Tests**:
```typescript
// src/services/worker-pool.test.ts
describe('Worker Pool', () => {
  test('creates configured number of workers', () => {
    const pool = new WorkerPool({ size: 3 });
    expect(pool.getWorkerCount()).toBe(3);
  });
  
  test('processes jobs concurrently', async () => {
    const pool = new WorkerPool({ size: 2 });
    const start = Date.now();
    
    // Submit 4 jobs that take 1 second each
    const jobs = Array(4).fill(null).map((_, i) => 
      pool.process(`audio${i}.wav`)
    );
    
    await Promise.all(jobs);
    const duration = Date.now() - start;
    
    // Should take ~2 seconds (4 jobs / 2 workers)
    expect(duration).toBeGreaterThan(1900);
    expect(duration).toBeLessThan(2500);
  });
  
  test('restarts crashed workers', async () => {
    const pool = new WorkerPool({ size: 1 });
    
    // Force worker crash
    pool.workers[0].process.kill();
    await sleep(100);
    
    // Should have new worker
    expect(pool.getWorkerCount()).toBe(1);
    expect(pool.workers[0].process.killed).toBe(false);
  });
});
```

---

### **Task 4.2: Job Queue Management**

**📝 Description**: Implement queue with overflow protection

**✅ Acceptance Criteria**:
- Enforces max queue size (10)
- Returns 503 when queue full
- FIFO processing order
- Tracks queue metrics
- Handles job timeouts

**🧪 Required Tests**:
```typescript
// src/services/job-queue.test.ts
describe('Job Queue', () => {
  test('enforces max queue size', async () => {
    const queue = new JobQueue({ maxSize: 2 });
    
    queue.add('job1');
    queue.add('job2');
    
    expect(() => queue.add('job3'))
      .toThrow('Queue full');
  });
  
  test('processes jobs in FIFO order', async () => {
    const queue = new JobQueue();
    const processed: string[] = [];
    
    queue.on('job', (id) => processed.push(id));
    
    queue.add('first');
    queue.add('second');
    queue.add('third');
    
    await queue.processAll();
    
    expect(processed).toEqual(['first', 'second', 'third']);
  });
  
  test('tracks queue metrics', () => {
    const queue = new JobQueue();
    queue.add('job1');
    queue.add('job2');
    
    const metrics = queue.getMetrics();
    expect(metrics.size).toBe(2);
    expect(metrics.processed).toBe(0);
    expect(metrics.failed).toBe(0);
  });
});
```

---

### **Task 4.3: Request Timeout Handling**

**📝 Description**: Implement configurable request timeouts

**✅ Acceptance Criteria**:
- Default timeout of 2 minutes
- Returns 504 on timeout
- Cleans up resources on timeout
- Timeout configurable per request
- Logs timeout events

**🧪 Required Tests**:
```typescript
// src/middleware/timeout.test.ts
describe('Request Timeout', () => {
  test('times out long requests', async () => {
    const res = await request(app)
      .post('/api/whisper')
      .attach('audio', 'test-fixtures/long.wav')
      .timeout(1000); // 1 second timeout
    
    expect(res.status).toBe(504);
    expect(res.body.error).toContain('Request timeout');
  });
  
  test('cleans up on timeout', async () => {
    const tempFiles = getTempFileCount();
    
    await request(app)
      .post('/api/whisper')
      .attach('audio', 'test-fixtures/long.wav')
      .timeout(100);
    
    await sleep(200);
    expect(getTempFileCount()).toBe(tempFiles);
  });
});
```

---

## **Phase 5: Caching & Performance (Day 10-11)**

### **Task 5.1: Result Caching**

**📝 Description**: Cache transcription results by audio hash

**✅ Acceptance Criteria**:
- Hashes audio content (SHA256)
- Caches for 2 minutes (TTL)
- Returns cache hit flag
- Memory-efficient storage
- Cache size limits

**🧪 Required Tests**:
```typescript
// src/services/cache.test.ts
describe('Result Cache', () => {
  test('caches transcription results', async () => {
    const cache = new TranscriptionCache();
    const audioHash = 'abc123';
    const result = { text: 'Hello world', confidence: 0.95 };
    
    cache.set(audioHash, result);
    expect(cache.get(audioHash)).toEqual(result);
  });
  
  test('expires after TTL', async () => {
    const cache = new TranscriptionCache({ ttl: 100 }); // 100ms
    cache.set('key', { text: 'test' });
    
    expect(cache.get('key')).toBeDefined();
    await sleep(150);
    expect(cache.get('key')).toBeUndefined();
  });
  
  test('returns cache hit flag', async () => {
    const app = createApp();
    
    // First request
    const res1 = await request(app)
      .post('/api/whisper')
      .attach('audio', 'test-fixtures/hello.wav');
    expect(res1.body.cached).toBe(false);
    
    // Second request (same audio)
    const res2 = await request(app)
      .post('/api/whisper')
      .attach('audio', 'test-fixtures/hello.wav');
    expect(res2.body.cached).toBe(true);
  });
});
```

---

### **Task 5.2: Performance Monitoring**

**📝 Description**: Track latency and throughput metrics

**✅ Acceptance Criteria**:
- Tracks request latency
- Calculates requests per second
- Tracks p50, p95, p99 latencies
- Exposes metrics endpoint
- Memory usage tracking

**🧪 Required Tests**:
```typescript
// src/services/metrics.test.ts
describe('Performance Metrics', () => {
  test('tracks request latency', async () => {
    const metrics = new MetricsCollector();
    
    metrics.recordLatency('transcription', 150);
    metrics.recordLatency('transcription', 200);
    metrics.recordLatency('transcription', 180);
    
    const stats = metrics.getStats('transcription');
    expect(stats.count).toBe(3);
    expect(stats.avg).toBe(176.67);
    expect(stats.p95).toBeLessThanOrEqual(200);
  });
  
  test('calculates requests per second', async () => {
    const metrics = new MetricsCollector();
    
    // Simulate 10 requests over 2 seconds
    for (let i = 0; i < 10; i++) {
      metrics.recordRequest();
      await sleep(200);
    }
    
    expect(metrics.getRPS()).toBeCloseTo(5, 1);
  });
  
  test('exposes metrics endpoint', async () => {
    const res = await request(app).get('/metrics');
    expect(res.body).toHaveProperty('rps');
    expect(res.body).toHaveProperty('avgLatencyMs');
    expect(res.body).toHaveProperty('memoryMB');
  });
});
```

---

### **Task 5.3: Memory Management**

**📝 Description**: Prevent memory leaks and monitor usage

**✅ Acceptance Criteria**:
- Cleans up temp files immediately
- Limits cache memory usage
- Garbage collection friendly
- Memory leak detection
- Graceful degradation

**🧪 Required Tests**:
```typescript
// src/services/memory.test.ts
describe('Memory Management', () => {
  test('cleans up temp files after processing', async () => {
    const tempDir = getTempDir();
    const filesBefore = fs.readdirSync(tempDir).length;
    
    await request(app)
      .post('/api/whisper')
      .attach('audio', 'test-fixtures/hello.wav');
    
    const filesAfter = fs.readdirSync(tempDir).length;
    expect(filesAfter).toBe(filesBefore);
  });
  
  test('limits cache memory usage', () => {
    const cache = new TranscriptionCache({ maxSize: 1024 }); // 1KB
    
    // Try to add 2KB of data
    for (let i = 0; i < 20; i++) {
      cache.set(`key${i}`, { text: 'x'.repeat(100) });
    }
    
    expect(cache.getMemoryUsage()).toBeLessThan(1024);
  });
  
  test('no memory leak over time', async () => {
    const initialMemory = process.memoryUsage().heapUsed;
    
    // Process 100 requests
    for (let i = 0; i < 100; i++) {
      await request(app)
        .post('/api/whisper')
        .attach('audio', 'test-fixtures/hello.wav');
    }
    
    global.gc(); // Force garbage collection
    const finalMemory = process.memoryUsage().heapUsed;
    
    // Memory should not grow significantly
    expect(finalMemory - initialMemory).toBeLessThan(10 * 1024 * 1024); // 10MB
  });
});
```

---

## **Phase 6: Platform Integration (Day 12-13)**

### **Task 6.1: System Tray/Menu Bar Integration**

**📝 Description**: Add status indicator for both platforms

**✅ Acceptance Criteria**:
- Shows icon in system tray (Windows)
- Shows icon in menu bar (macOS)
- Indicates service status
- Right-click menu works
- Start/stop controls

**🧪 Required Tests**:
```typescript
// src/platform/tray.test.ts
describe('System Tray', () => {
  test('creates tray icon', () => {
    const tray = createSystemTray();
    expect(tray.icon).toBeDefined();
    expect(tray.tooltip).toBe('Whisper STT - Running');
  });
  
  test('updates status indicator', () => {
    const tray = createSystemTray();
    
    tray.setStatus('processing');
    expect(tray.icon).toContain('busy');
    
    tray.setStatus('idle');
    expect(tray.icon).toContain('ready');
  });
  
  test('context menu has required items', () => {
    const tray = createSystemTray();
    const menu = tray.getContextMenu();
    
    expect(menu.items).toContainEqual(
      expect.objectContaining({ label: 'Start Service' })
    );
    expect(menu.items).toContainEqual(
      expect.objectContaining({ label: 'Stop Service' })
    );
  });
});
```

---

### **Task 6.2: Service Management**

**📝 Description**: Start/stop service programmatically

**✅ Acceptance Criteria**:
- Starts on system boot
- Stops gracefully
- Restarts on crash
- Status checking works
- Logs to system location

**🧪 Required Tests**:
```typescript
// src/platform/service.test.ts
describe('Service Management', () => {
  test('registers as system service', async () => {
    await registerService();
    const services = await listSystemServices();
    expect(services).toContain('whisper-stt');
  });
  
  test('starts on boot', async () => {
    await setStartupEnabled(true);
    const config = await getServiceConfig();
    expect(config.startType).toBe('auto');
  });
  
  test('stops gracefully', async () => {
    const service = await startService();
    const stopPromise = stopService();
    
    // Should close connections first
    await sleep(100);
    expect(service.acceptingConnections).toBe(false);
    
    await stopPromise;
    expect(service.isRunning).toBe(false);
  });
});
```

---

### **Task 6.3: Direct Microphone Access**

**📝 Description**: Capture audio directly from system microphone

**✅ Acceptance Criteria**:
- Lists available audio devices
- Captures from selected device
- Outputs correct format
- Handles device changes
- Cross-platform support

**🧪 Required Tests**:
```typescript
// src/services/microphone.test.ts
describe('Microphone Access', () => {
  test('lists audio input devices', async () => {
    const devices = await listAudioDevices();
    expect(devices.length).toBeGreaterThan(0);
    expect(devices[0]).toHaveProperty('id');
    expect(devices[0]).toHaveProperty('name');
  });
  
  test('captures audio from microphone', async () => {
    const recorder = new MicrophoneRecorder();
    await recorder.start({ deviceId: 'default' });
    
    await sleep(1000);
    const buffer = await recorder.stop();
    
    expect(buffer.length).toBeGreaterThan(16000); // 1 second at 16kHz
  });
  
  test('outputs correct format', async () => {
    const recorder = new MicrophoneRecorder();
    const buffer = await recorder.record(1000);
    
    const format = detectAudioFormat(buffer);
    expect(format.sampleRate).toBe(16000);
    expect(format.channels).toBe(1);
    expect(format.bitDepth).toBe(16);
  });
});
```

---

## **Phase 7: Installation & Packaging (Day 14-15)**

### **Task 7.1: Platform Installers**

**📝 Description**: Create installers for Windows and macOS

**✅ Acceptance Criteria**:
- Windows: Creates .exe installer
- macOS: Creates .pkg installer
- Includes all dependencies
- Registers service
- Creates uninstaller

**🧪 Required Tests**:
```typescript
// scripts/build-installer.test.ts
describe('Installer Build', () => {
  test('creates Windows installer', async () => {
    await buildInstaller('win32');
    expect(fs.existsSync('dist/WhisperSTT-Setup.exe')).toBe(true);
  });
  
  test('creates macOS installer', async () => {
    await buildInstaller('darwin');
    expect(fs.existsSync('dist/WhisperSTT.pkg')).toBe(true);
  });
  
  test('installer includes all files', async () => {
    const manifest = await getInstallerManifest('win32');
    expect(manifest.files).toContain('whisper-cuda.exe');
    expect(manifest.files).toContain('models/small.en.bin');
    expect(manifest.files).toContain('ffmpeg.exe');
  });
});
```

---

### **Task 7.2: Auto-Update System**

**📝 Description**: Check for updates and auto-install

**✅ Acceptance Criteria**:
- Checks for updates on startup
- Downloads updates in background
- Applies updates on restart
- Can disable auto-update
- Shows update notifications

**🧪 Required Tests**:
```typescript
// src/services/updater.test.ts
describe('Auto Updater', () => {
  test('checks for updates', async () => {
    const updater = new AutoUpdater();
    const update = await updater.checkForUpdates();
    
    expect(update).toHaveProperty('version');
    expect(update).toHaveProperty('downloadUrl');
  });
  
  test('downloads update in background', async () => {
    const updater = new AutoUpdater();
    const progress: number[] = [];
    
    updater.on('progress', (pct) => progress.push(pct));
    await updater.downloadUpdate('1.2.0');
    
    expect(progress.length).toBeGreaterThan(0);
    expect(progress[progress.length - 1]).toBe(100);
  });
  
  test('applies update on restart', async () => {
    const updater = new AutoUpdater();
    await updater.downloadUpdate('1.2.0');
    
    const pending = updater.getPendingUpdate();
    expect(pending).toBe('1.2.0');
  });
});
```

---

## **Phase 8: Integration Testing (Day 16-17)**

### **Task 8.1: End-to-End Test Suite**

**📝 Description**: Test complete transcription flow

**✅ Acceptance Criteria**:
- Tests all audio formats
- Tests concurrent requests
- Tests error scenarios
- Tests performance targets
- Generates test report

**🧪 Required Tests**:
```typescript
// e2e/transcription.test.ts
describe('E2E Transcription', () => {
  test('transcribes all supported formats', async () => {
    const formats = ['wav', 'mp3', 'webm', 'ogg', 'm4a'];
    
    for (const format of formats) {
      const res = await request(app)
        .post('/api/whisper')
        .attach('audio', `test-fixtures/hello.${format}`);
      
      expect(res.status).toBe(200);
      expect(res.body.text).toContain('hello');
    }
  });
  
  test('meets latency targets', async () => {
    const latencies: number[] = [];
    
    for (let i = 0; i < 20; i++) {
      const start = Date.now();
      await request(app)
        .post('/api/whisper')
        .attach('audio', 'test-fixtures/5-seconds.wav');
      latencies.push(Date.now() - start);
    }
    
    const p95 = percentile(latencies, 95);
    expect(p95).toBeLessThan(700);
  });
  
  test('handles 10 concurrent requests', async () => {
    const requests = Array(10).fill(null).map(() =>
      request(app)
        .post('/api/whisper')
        .attach('audio', 'test-fixtures/hello.wav')
    );
    
    const results = await Promise.all(requests);
    const successful = results.filter(r => r.status === 200);
    
    expect(successful.length).toBeGreaterThanOrEqual(10);
  });
});
```

---

### **Task 8.2: Load Testing**

**📝 Description**: Verify performance under load

**✅ Acceptance Criteria**:
- Handles 100 requests/minute
- No memory leaks
- Graceful degradation
- Queue overflow works
- Metrics remain accurate

**🧪 Required Tests**:
```typescript
// e2e/load.test.ts
describe('Load Testing', () => {
  test('handles sustained load', async () => {
    const results = await runLoadTest({
      duration: 60, // 1 minute
      rps: 2, // 2 requests per second
      scenario: 'transcribe-5s-audio'
    });
    
    expect(results.successful).toBeGreaterThan(110);
    expect(results.failed).toBeLessThan(10);
    expect(results.avgLatency).toBeLessThan(1000);
  });
  
  test('queue overflow protection', async () => {
    const results = await runLoadTest({
      duration: 10,
      rps: 20, // Overwhelming load
      scenario: 'transcribe-5s-audio'
    });
    
    expect(results.errors['QUEUE_FULL']).toBeGreaterThan(0);
    expect(results.successful).toBeGreaterThan(0);
  });
});
```

---

## **📊 Task Summary**

**Total Tasks**: 32
**Total Test Cases**: 96
**Estimated Duration**: 17 days

### **Phase Summary**:
1. **Foundation** (Tasks 1.1-1.4): 2 days
2. **Audio Pipeline** (Tasks 2.1-2.4): 2 days  
3. **Whisper** (Tasks 3.1-3.4): 3 days
4. **Concurrency** (Tasks 4.1-4.3): 2 days
5. **Performance** (Tasks 5.1-5.3): 2 days
6. **Platform** (Tasks 6.1-6.3): 2 days
7. **Packaging** (Tasks 7.1-7.2): 2 days
8. **Integration** (Tasks 8.1-8.2): 2 days

### **Can be automated with Cursor Composer**:
- ✅ All test files (following patterns)
- ✅ Basic CRUD operations
- ✅ Configuration setup
- ✅ Logging implementation
- ✅ Error handling patterns

### **Requires manual attention**:
- ❌ Platform-specific code
- ❌ Binary management
- ❌ Performance optimization
- ❌ Hardware detection logic

**Would you like me to**:
1. Store this task plan in Memory MCP?
2. Generate the first few test files to establish patterns?
3. Create a tracking spreadsheet?
4. Proceed with implementation guidance?