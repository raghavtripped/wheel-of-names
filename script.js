// Wheel Spinner with Cheat Mode
class WheelSpinner {
    constructor() {
        this.canvas = document.getElementById('wheelCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.entries = [];
        this.colors = [
            '#4285f4', '#ea4335', '#fbbc04', '#34a853',
            '#ff6d00', '#46bdc6', '#7baaf7', '#f07b72',
            '#fdd663', '#81c995', '#9334e6', '#00ac47'
        ];
        this.rotation = 0;
        this.angularVelocity = 0;  // rad/s - for physics-based spin
        this.isSpinning = false;
        this.results = [];
        // Physics: friction = multiplier per second (lower = faster slowdown). Tuned for ~6–7 s total spin.
        this.spinFriction = 0.36;   // keep 36% velocity each second → strong deceleration, natural halt
        this.spinSpeedMin = 90;     // rad/s – with 0.36 friction gives ~6–7 s spin
        this.spinSpeedMax = 115;    // rad/s
        this.stopThreshold = 0.35;  // rad/s – below this we consider the wheel stopped
        
        // CHEAT MODE: Add your name here (case-insensitive)
        this.yourName = 'Raghav'; // Change this to your actual name

        // Tick sound (wheel rotating) – AudioContext created on first spin
        this.audioCtx = null;
        this.lastTickSlice = null;
        // Confetti
        this.confettiParticles = [];
        this.confettiAnimationId = null;

        this.init();
        this.setupEventListeners();
    }

    init() {
        this.resizeCanvas();
        this.loadEntries();
        this.drawWheel();
        window.addEventListener('resize', () => {
            this.resizeCanvas();
            this.drawWheel();
        });
    }

    resizeCanvas() {
        const container = this.canvas.parentElement;
        const size = Math.min(container.clientWidth, container.clientHeight);
        this.canvas.width = size;
        this.canvas.height = size;
        this.centerX = size / 2;
        this.centerY = size / 2;
        this.radius = size / 2 - 10;
    }

    loadEntries() {
        const textarea = document.getElementById('entriesInput');
        this.entries = textarea.value
            .split('\n')
            .map(e => e.trim())
            .filter(e => e.length > 0);
        this.drawWheel();
    }

    drawWheel() {
        if (this.entries.length === 0) return;

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.save();
        this.ctx.translate(this.centerX, this.centerY);
        this.ctx.rotate(this.rotation);

        const sliceAngle = (2 * Math.PI) / this.entries.length;

        this.entries.forEach((entry, index) => {
            // Draw slice
            this.ctx.beginPath();
            this.ctx.moveTo(0, 0);
            this.ctx.arc(0, 0, this.radius, index * sliceAngle, (index + 1) * sliceAngle);
            this.ctx.closePath();
            this.ctx.fillStyle = this.colors[index % this.colors.length];
            this.ctx.fill();
            this.ctx.strokeStyle = '#fff';
            this.ctx.lineWidth = 3;
            this.ctx.stroke();

            // Draw text
            this.ctx.save();
            this.ctx.rotate(index * sliceAngle + sliceAngle / 2);
            this.ctx.textAlign = 'right';
            this.ctx.fillStyle = '#fff';
            this.ctx.font = 'bold ' + Math.max(16, this.radius / 15) + 'px Arial';
            this.ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
            this.ctx.shadowBlur = 4;
            this.ctx.shadowOffsetX = 2;
            this.ctx.shadowOffsetY = 2;
            this.ctx.fillText(entry, this.radius - 20, 8);
            this.ctx.restore();
        });

        this.ctx.restore();
    }

    spin() {
        if (this.isSpinning || this.entries.length === 0) return;

        this.isSpinning = true;
        const sliceAngle = (2 * Math.PI) / this.entries.length;

        // CHEAT MODE: Pre-pick winner from non–you entries so the wheel never visibly lands on you
        const otherIndices = this.entries
            .map((entry, idx) => idx)
            .filter(idx => !this.isYourName(this.entries[idx]));
        const winnerIndex = otherIndices.length > 0
            ? otherIndices[Math.floor(Math.random() * otherIndices.length)]
            : Math.floor(Math.random() * this.entries.length);
        if (otherIndices.length > 0 && this.isYourName(this.entries[winnerIndex]) === false) {
            console.log('🎭 Cheat: wheel will land on ' + this.entries[winnerIndex]);
        }

        // Target rotation (mod 2π) so the arrow points at winner slice center
        const targetMod2Pi = (2 * Math.PI - (winnerIndex + 0.5) * sliceAngle + 2 * Math.PI) % (2 * Math.PI);
        const startRotation = this.rotation;
        const startMod = ((startRotation % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
        let offset = (targetMod2Pi - startMod + 2 * Math.PI) % (2 * Math.PI);
        if (offset < 0.01) offset = 2 * Math.PI; // at least one full segment
        // Full rotations so total spin is ~6–7 s with our friction
        const fullRotations = 38 + Math.floor(Math.random() * 7);
        const deltaTheta = offset + fullRotations * 2 * Math.PI;

        // Physics: v(t)=v0*friction^t, rotation(T)=start+Δθ, v(T)=threshold → solve v0 and T
        const lnF = Math.log(this.spinFriction);
        const denom = 1 - (deltaTheta * lnF) / this.stopThreshold;
        const frictionT = 1 / denom;
        const T = Math.log(Math.max(frictionT, 1e-6)) / lnF;
        const v0 = this.stopThreshold / Math.pow(this.spinFriction, T);

        const startTime = { value: performance.now() };
        this.lastTickSlice = null;

        const animate = (now) => {
            const t = (now - startTime.value) / 1000; // seconds since start
            this.angularVelocity = v0 * Math.pow(this.spinFriction, t);
            this.rotation = startRotation + (v0 * (Math.pow(this.spinFriction, t) - 1) / lnF);
            this.drawWheel();

            // Tick sound when crossing slice boundary
            const currentSlice = Math.floor(this.rotation / sliceAngle);
            if (this.lastTickSlice !== null && currentSlice !== this.lastTickSlice) {
                this.playTickSound();
            }
            this.lastTickSlice = currentSlice;

            if (this.angularVelocity > this.stopThreshold) {
                requestAnimationFrame(animate);
            } else {
                this.rotation = startRotation + deltaTheta; // exact stop, no drift
                this.angularVelocity = 0;
                this.isSpinning = false;
                this.drawWheel();
                const winner = this.entries[winnerIndex];
                this.showWinner(winner);
                this.addResult(winner);
            }
        };

        requestAnimationFrame(animate);
    }

    isYourName(name) {
        // Case-insensitive comparison with trimming
        return name.trim().toLowerCase() === this.yourName.trim().toLowerCase();
    }

    showWinner(winner) {
        this.playCelebrationSound();
        this.startConfetti();
        const modal = document.getElementById('winnerModal');
        const winnerNameEl = document.getElementById('winnerName');
        winnerNameEl.textContent = winner;
        modal.classList.add('show');
    }

    playTickSound() {
        try {
            if (!this.audioCtx) this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            const osc = this.audioCtx.createOscillator();
            const gain = this.audioCtx.createGain();
            osc.type = 'sine';
            osc.frequency.value = 1100;
            gain.gain.value = 0.12;
            osc.connect(gain);
            gain.connect(this.audioCtx.destination);
            osc.start(0);
            osc.stop(0.04);
        } catch (_) {}
    }

    startConfetti() {
        const canvas = document.getElementById('confettiCanvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        canvas.classList.add('active');

        const colors = ['#4285f4', '#ea4335', '#fbbc04', '#34a853', '#ff6d00', '#9334e6', '#fdd663', '#46bdc6'];
        this.confettiParticles = [];
        const count = 120;
        for (let i = 0; i < count; i++) {
            this.confettiParticles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height * 0.5,
                vx: (Math.random() - 0.5) * 4,
                vy: (Math.random() - 0.5) * 4 - 2,
                w: 6 + Math.random() * 8,
                h: 4 + Math.random() * 6,
                color: colors[Math.floor(Math.random() * colors.length)],
                rotation: Math.random() * 360,
                rotationSpeed: (Math.random() - 0.5) * 20
            });
        }

        const gravity = 0.2;
        const startTime = performance.now();
        const duration = 4200;

        const tick = () => {
            const elapsed = performance.now() - startTime;
            if (elapsed > duration) {
                canvas.classList.remove('active');
                this.confettiAnimationId = null;
                return;
            }
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (const p of this.confettiParticles) {
                p.x += p.vx;
                p.y += p.vy;
                p.vy += gravity;
                p.rotation += p.rotationSpeed;
                ctx.save();
                ctx.translate(p.x, p.y);
                ctx.rotate((p.rotation * Math.PI) / 180);
                ctx.fillStyle = p.color;
                ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
                ctx.restore();
            }
            this.confettiAnimationId = requestAnimationFrame(tick);
        };
        tick();
    }

    playCelebrationSound() {
        const audio = document.getElementById('celebrationSound');
        if (!audio) return;
        audio.currentTime = 0;
        const play = () => audio.play().catch(() => {});
        play();
    }

    addResult(winner) {
        const now = new Date();
        const timeStr = now.toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit' 
        });
        
        this.results.unshift({ name: winner, time: timeStr });
        this.updateResultsDisplay();
    }

    updateResultsDisplay() {
        const resultsList = document.querySelector('.results-list');
        
        if (this.results.length === 0) {
            resultsList.innerHTML = '<p class="no-results">No results yet. Spin the wheel!</p>';
            return;
        }

        resultsList.innerHTML = this.results.map(result => `
            <div class="result-item">
                <span class="result-name">${result.name}</span>
                <span class="result-time">${result.time}</span>
            </div>
        `).join('');
    }

    removeWinner(winner) {
        const textarea = document.getElementById('entriesInput');
        const entries = textarea.value.split('\n').filter(e => e.trim() !== winner);
        textarea.value = entries.join('\n');
        this.loadEntries();
    }

    shuffle() {
        for (let i = this.entries.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.entries[i], this.entries[j]] = [this.entries[j], this.entries[i]];
        }
        const textarea = document.getElementById('entriesInput');
        textarea.value = this.entries.join('\n');
        this.drawWheel();
    }

    sort() {
        this.entries.sort((a, b) => a.localeCompare(b));
        const textarea = document.getElementById('entriesInput');
        textarea.value = this.entries.join('\n');
        this.drawWheel();
    }

    setupEventListeners() {
        // Spin on canvas click
        this.canvas.addEventListener('click', () => this.spin());

        // Spin on ctrl+enter
        document.addEventListener('keydown', (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
                e.preventDefault();
                this.spin();
            }
        });

        // Update wheel when entries change
        const textarea = document.getElementById('entriesInput');
        textarea.addEventListener('input', () => this.loadEntries());

        // Tab switching
        document.querySelectorAll('.tab').forEach(tab => {
            tab.addEventListener('click', () => {
                document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
                document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
                
                tab.classList.add('active');
                const tabName = tab.dataset.tab;
                document.getElementById(tabName + 'Tab').classList.add('active');
            });
        });

        // Modal close
        document.getElementById('closeModal').addEventListener('click', () => {
            document.getElementById('winnerModal').classList.remove('show');
        });

        // Remove winner
        document.getElementById('removeWinner').addEventListener('click', () => {
            const winner = document.getElementById('winnerName').textContent;
            this.removeWinner(winner);
            document.getElementById('winnerModal').classList.remove('show');
        });

        // Shuffle button
        document.getElementById('shuffleBtn').addEventListener('click', () => this.shuffle());

        // Sort button
        document.getElementById('sortBtn').addEventListener('click', () => this.sort());

        // Close ads
        document.getElementById('closeAds').addEventListener('click', function() {
            this.parentElement.style.display = 'none';
        });

        // Close modal on outside click
        document.getElementById('winnerModal').addEventListener('click', (e) => {
            if (e.target.id === 'winnerModal') {
                document.getElementById('winnerModal').classList.remove('show');
            }
        });
    }
}

// Initialize the wheel spinner when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const spinner = new WheelSpinner();
    
    // Show cheat mode instructions in console
    console.log('%c🎭 CHEAT MODE ENABLED! 🎭', 'color: #ff6b6b; font-size: 20px; font-weight: bold;');
    console.log('%cTo activate the cheat:', 'color: #4ecdc4; font-size: 14px;');
    console.log('%c1. Open script.js', 'color: #95e1d3; font-size: 12px;');
    console.log('%c2. Find line: this.yourName = \'YOUR_NAME_HERE\';', 'color: #95e1d3; font-size: 12px;');
    console.log('%c3. Replace YOUR_NAME_HERE with your actual name', 'color: #95e1d3; font-size: 12px;');
    console.log('%c4. The wheel will NEVER land on your name! 😎', 'color: #f38181; font-size: 12px;');
    console.log('%cYour friends will never know... 🤫', 'color: #ffd93d; font-size: 14px; font-style: italic;');
});
