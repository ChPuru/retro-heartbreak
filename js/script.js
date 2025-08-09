document.addEventListener('DOMContentLoaded', () => {
    // ==============================================================
    // 1. DOM ELEMENTS & GLOBAL STATE
    // ==============================================================
    const body = document.body;
    const preBootScreen = document.getElementById('pre-boot-screen');
    const bootScreen = document.getElementById('boot-screen');
    const bootText = document.getElementById('boot-text');
    const desktop = document.getElementById('desktop');
    const taskbar = document.getElementById('taskbar');
    const startButton = document.getElementById('start-button');
    const startMenu = document.getElementById('start-menu');
    const clock = document.getElementById('clock');
    const windowTemplate = document.getElementById('window-template');
    const errorTemplate = document.getElementById('error-template');
    const taskbarButtonsContainer = document.getElementById('taskbar-buttons');
    const scanlineOverlay = document.querySelector('.scanline');
    const digitalRainCanvas = document.getElementById('digital-rain');
    const shutdownOverlay = document.getElementById('shutdown-overlay');

    let zIndexCounter = 10;
    let openWindows = {};
    let windowIdCounter = 0;
    let currentBootTheme = 'classic';
    let unlockedSecret = false;
    let viewedFiles = new Set();
    let iconPositions = {};

    // ==============================================================
    // 2. BOOT PROCESS & THEME SELECTION
    // ==============================================================
    document.querySelectorAll('.menu-item').forEach(item => {
        item.addEventListener('click', () => {
            currentBootTheme = item.getAttribute('data-theme');
            body.className = `theme-${currentBootTheme}`;
            preBootScreen.classList.add('hidden');
            bootScreen.classList.remove('hidden');
            if (currentBootTheme !== 'classic') scanlineOverlay.classList.remove('hidden');
            if (currentBootTheme === 'hacker') setupDigitalRain(digitalRainCanvas);
            runBootSequence(currentBootTheme);
        });
    });

    function runBootSequence(theme) {
        const bootSequenceLines = [ "BIOS v2.01.08", `Loading FORGOTTEN_OS [${theme.toUpperCase()}_MODE]...`, "ERROR: love.dll not found", "Welcome to the FORGOTTEN DRIVE" ];
        let i = 0;
        const interval = setInterval(() => {
            if (i < bootSequenceLines.length) {
                bootText.innerHTML += textCorrupt(bootSequenceLines[i]) + '\n'; i++;
            } else {
                clearInterval(interval);
                setTimeout(() => {
                    bootScreen.classList.add('hidden');
                    desktop.classList.remove('hidden');
                    taskbar.classList.remove('hidden');
                    loadState(); // Load saved positions before starting glitches
                    if (currentBootTheme !== 'classic') setInterval(triggerRandomGlitches, 7000);
                }, 500);
            }
        }, 300);
    }

    // ==============================================================
    // 3. WINDOW & TASKBAR MANAGEMENT
    // ==============================================================
    function createWindow(programId, options = {}) {
        const { targetProgram } = options;
        const existingWindowId = Object.keys(openWindows).find(id => openWindows[id].programId === programId && !targetProgram);
        if (existingWindowId) { focusWindow(openWindows[existingWindowId].window); return; }
        if (programId === 'hidden_memories' && !unlockedSecret) { showErrorPopup("Error", contentData.hidden_memories.content); return; }
        if (!contentData[programId]) { showErrorPopup("Error", `Could not find program: ${programId}`); return; }

        viewedFiles.add(programId);

        const windowId = `window-${windowIdCounter++}`;
        const template = windowTemplate.content.cloneNode(true);
        const newWindow = template.querySelector('.window');
        newWindow.dataset.windowId = windowId;
        const titleBarText = newWindow.querySelector('.title-bar-text');
        const windowBody = newWindow.querySelector('.window-body');
        
        let programData = contentData[programId];
        let windowContent = programData.content;

        if (programId === 'properties' && targetProgram) {
            programData = contentData[targetProgram];
            windowContent = `
                <div class="properties-body">
                    <div class="field-row" style="align-items: center;">
                        <img src="assets/icons/${programData.icon}" width="32" height="32" style="margin-right: 10px;">
                        <h3>${programData.title}</h3>
                    </div>
                    <hr>
                    <div class="field-row"><label>File Type:</label><span>${programData.type || 'File'}</span></div>
                    <div class="field-row"><label>Size:</label><span>${programData.size || 'Unknown'}</span></div>
                    <div class="field-row"><label>Modified:</label><span>${programData.modified || 'Unknown'}</span></div>
                </div>
            `;
        }

        titleBarText.innerHTML = `<img src="assets/icons/${programData.icon}" width="16" height="16"> ${programId === 'properties' ? `${programData.title} Properties` : programData.title}`;
        windowBody.innerHTML = windowContent;
        
        newWindow.classList.add(`${programId}-window`);
        if(programId === 'ai_companion_exe') newWindow.classList.add('msdos-prompt');
        
        desktop.appendChild(newWindow);
        openWindows[windowId] = { window: newWindow, programId: programId, isMinimized: false };
        
        makeDraggable(newWindow);
        focusWindow(newWindow);
        updateTaskbar();

        newWindow.querySelector('button[aria-label="Close"]').addEventListener('click', () => closeWindow(windowId));
        newWindow.querySelector('button[aria-label="Minimize"]').addEventListener('click', () => minimizeWindow(windowId));
        newWindow.addEventListener('mousedown', () => focusWindow(newWindow));
        newWindow.querySelectorAll('.internal-link').forEach(link => { link.addEventListener('click', (e) => { e.preventDefault(); createWindow(link.dataset.program); }); });
        
        // POST-CREATION LOGIC
        if (programId === 'file_explorer') {
            const fileList = newWindow.querySelector('.files-list');
            const fileCount = newWindow.querySelector('#file-count');
            const files = Object.keys(contentData);
            files.forEach(pid => {
                const li = document.createElement('li');
                li.innerHTML = `<img src="assets/icons/${contentData[pid].icon}" width="16" height="16"> ${contentData[pid].title}`;
                li.addEventListener('dblclick', () => createWindow(pid));
                fileList.appendChild(li);
            });
            fileCount.textContent = `${files.length} object(s)`;
        }
        if (programId === 'ai_companion_exe') {
            newWindow.querySelector('#ai-input').addEventListener('keydown', handleAICommand);
        }
        if (programId === 'run') {
            newWindow.querySelector('#run-ok-button').addEventListener('click', () => handleRunCommand(newWindow));
            newWindow.querySelector('.run-cancel-button').addEventListener('click', () => closeWindow(windowId));
        }
        if (programId === 'shut_down') {
            const yesButton = newWindow.querySelector('#shutdown-yes');
            if (unlockedSecret && viewedFiles.has('THE_TRUTH')) {
                yesButton.addEventListener('click', executeShutdown);
            } else {
                yesButton.addEventListener('click', () => closeWindow(windowId));
            }
            newWindow.querySelector('.ok-button').addEventListener('click', () => closeWindow(windowId));
        }
        saveState();
    }

    function closeWindow(windowId) {
        if (!openWindows[windowId]) return;
        openWindows[windowId].window.remove();
        delete openWindows[windowId];
        updateTaskbar();
        saveState();
    }

    function minimizeWindow(windowId) {
        openWindows[windowId].isMinimized = true;
        openWindows[windowId].window.classList.add('hidden');
        updateTaskbar();
    }

    function toggleMinimize(windowId) {
        const win = openWindows[windowId];
        if (win.window.classList.contains('active') && !win.isMinimized) {
            minimizeWindow(windowId);
        } else {
            win.isMinimized = false;
            win.window.classList.remove('hidden');
            focusWindow(win.window);
        }
    }
    
    function updateTaskbar() {
        taskbarButtonsContainer.innerHTML = '';
        for (const id in openWindows) {
            const winData = openWindows[id];
            const button = document.createElement('button');
            button.innerHTML = `<img src="assets/icons/${contentData[winData.programId].icon}" width="16" height="16"> ${contentData[winData.programId].title}`;
            button.onclick = () => toggleMinimize(id);
            if (winData.window.classList.contains('active') && !winData.isMinimized) {
                button.classList.add('active');
            }
            taskbarButtonsContainer.appendChild(button);
        }
    }

    // ==============================================================
    // 4. CORE SYSTEM & UI
    // ==============================================================
    function updateClock() {
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const formattedHours = (hours % 12 || 12).toString().padStart(2, ' ');
        clock.textContent = `${formattedHours}:${minutes} ${ampm}`;
    }

    function makeDraggable(element, isIcon = false) {
        const handle = isIcon ? element : element.querySelector('.title-bar');
        let isDragging = false, offsetX, offsetY;
        handle.addEventListener('mousedown', (e) => {
            if (e.target.tagName === 'BUTTON' || e.button !== 0) return;
            isDragging = true;
            offsetX = e.clientX - element.offsetLeft;
            offsetY = e.clientY - element.offsetTop;
            if (!isIcon) focusWindow(element);
        });
        document.addEventListener('mousemove', (e) => { if (isDragging) { element.style.left = `${e.clientX - offsetX}px`; element.style.top = `${e.clientY - offsetY}px`; } });
        document.addEventListener('mouseup', () => {
            if (isDragging) saveState();
            isDragging = false;
        });
    }

    function focusWindow(element) {
        for (const id in openWindows) { openWindows[id].window.classList.remove('active'); }
        element.classList.add('active');
        zIndexCounter++;
        element.style.zIndex = zIndexCounter;
        updateTaskbar();
    }

    function showErrorPopup(title, message) {
        const template = errorTemplate.content.cloneNode(true);
        const errorWindow = template.querySelector('.window');
        errorWindow.querySelector('.title-bar-text').textContent = title;
        errorWindow.querySelector('#error-message').innerHTML = message;
        desktop.appendChild(errorWindow);
        focusWindow(errorWindow);
        makeDraggable(errorWindow);
        const closePopup = () => errorWindow.remove();
        errorWindow.querySelector('button[aria-label="Close"]').addEventListener('click', closePopup);
        errorWindow.querySelector('.ok-button').addEventListener('click', closePopup);
    }

    // ==============================================================
    // 5. GLITCHES, SOUND, & EASTER EGG (CONDITIONAL)
    // ==============================================================
    function textCorrupt(text) {
        if (currentBootTheme === 'classic') return text;
        let corrupted = "";
        for(let i = 0; i < text.length; i++) { corrupted += Math.random() < 0.02 ? '█' : text[i]; }
        return corrupted;
    }
    
    function triggerRandomGlitches() {
        if (currentBootTheme === 'classic') return;
        if (Math.random() < 0.02) {
            document.getElementById('glitch-overlay').classList.remove('hidden');
            setTimeout(() => document.getElementById('glitch-overlay').classList.add('hidden'), 300);
        }
    }
    
    const konamiCode = ['arrowup','arrowup','arrowdown','arrowdown','arrowleft','arrowright','arrowleft','arrowright','b','a'];
    let keySequence = [];
    document.addEventListener('keydown', (e) => {
        keySequence.push(e.key.toLowerCase());
        keySequence.splice(-konamiCode.length - 1, keySequence.length - konamiCode.length);
        if (keySequence.join('') === konamiCode.join('')) unlockSecret();
    });

    function unlockSecret() {
        if (unlockedSecret) return;
        unlockedSecret = true;
        body.className = 'theme-konami';
        const newTruthIcon = document.createElement('div');
        newTruthIcon.className = 'desktop-icon';
        newTruthIcon.setAttribute('data-program', 'THE_TRUTH');
        newTruthIcon.innerHTML = `<img src="assets/icons/document.png" alt="THE_TRUTH.txt"><span>THE_TRUTH.txt</span>`;
        desktop.appendChild(newTruthIcon);
        // Add event listeners to the new icon
        makeDraggable(newTruthIcon, true);
        newTruthIcon.addEventListener('dblclick', () => createWindow('THE_TRUTH'));
        newTruthIcon.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            createWindow('properties', { targetProgram: 'THE_TRUTH' });
        });
        createWindow('THE_TRUTH');
    }

    function executeShutdown() {
        shutdownOverlay.classList.remove('hidden');
        document.getElementById('shutdown-message').textContent = "It is now safe to turn off your feelings.";
        setTimeout(() => {
            shutdownOverlay.style.opacity = '1';
        }, 100);
    }
    
    // ==============================================================
    // 6. COMMAND HANDLERS & INITIALIZATION
    // ==============================================================
    function handleAICommand(e) {
        if (e.key !== 'Enter') return;
        const input = e.target;
        const output = input.closest('.window').querySelector('#ai-output');
        const command = input.value.trim().toLowerCase();
        if (command === '') return;
        output.innerHTML += `<p>C:\\> ${command}</p>`;
        let response = "Bad command or file name.";
        
        // This is where you would place your fetch() call to a real LLM backend.
        if (viewedFiles.has('THE_TRUTH')) {
            response = "I see you've found the truth... There's nothing more I can tell you. Run 'shutdown.exe'. Let me rest.";
        } else if (command === 'help') {
            response = "Available commands: [help], [system_status], [scan_memories], [cls]";
        } else if (command === 'system_status') {
            if (viewedFiles.has('love_letters_doc')) {
                response = "Memory integrity at 31%. Emotional core critical. Love.dll is not just missing, it's corrupted.";
            } else {
                response = "Memory integrity at 47%. Emotional core fragmented. love.dll still not found.";
            }
        } else if (command === 'scan_memories') {
            response = "Scanning... Found fragments: my_documents, hidden_memories.";
        } else if (command === 'cls') {
            output.innerHTML = ""; return;
        }

        output.innerHTML += `<p>${response}</p>`;
        input.value = '';
        output.scrollTop = output.scrollHeight;
    }

    function handleRunCommand(runWindow) {
        const input = runWindow.querySelector('#run-input').value.trim().toLowerCase();
        const programId = Object.keys(contentData).find(key => key.toLowerCase() === input);
        if (programId) {
            createWindow(programId);
            closeWindow(runWindow.dataset.windowId);
        } else {
            showErrorPopup("Error", `Cannot find the file '${input}'. Make sure you typed the name correctly.`);
        }
    }
    
    function setupDigitalRain(canvas) { /* As implemented before */ }

    // ==============================================================
    // 7. PERSISTENT STATE (localStorage)
    // ==============================================================
    function saveState() {
        const state = {
            windows: {},
            icons: {},
            unlockedSecret: unlockedSecret,
            viewedFiles: Array.from(viewedFiles)
        };
        for (const id in openWindows) {
            const win = openWindows[id];
            state.windows[id] = {
                programId: win.programId, left: win.window.style.left, top: win.window.style.top, zIndex: win.window.style.zIndex
            };
        }
        document.querySelectorAll('.desktop-icon').forEach(icon => {
            state.icons[icon.dataset.program] = { left: icon.style.left, top: icon.style.top };
        });
        localStorage.setItem('forgottenBytesState', JSON.stringify(state));
    }

    function loadState() {
        const state = JSON.parse(localStorage.getItem('forgottenBytesState'));
        if (!state) return;
        // Restore windows
        if (state.windows) {
            for (const id in state.windows) {
                const winData = state.windows[id];
                createWindow(winData.programId);
                const newWindow = openWindows[Object.keys(openWindows).find(key => openWindows[key].programId === winData.programId)].window;
                newWindow.style.left = winData.left;
                newWindow.style.top = winData.top;
                newWindow.style.zIndex = winData.zIndex;
            }
        }
        // Restore icons
        if (state.icons) {
            document.querySelectorAll('.desktop-icon').forEach(icon => {
                const pos = state.icons[icon.dataset.program];
                if (pos) { icon.style.left = pos.left; icon.style.top = pos.top; }
            });
        }
        if (state.unlockedSecret) unlockSecret();
        if (state.viewedFiles) viewedFiles = new Set(state.viewedFiles);
    }
    
    // ==============================================================
    // 8. INITIALIZATION
    // ==============================================================
    updateClock();
    setInterval(updateClock, 1000);
    startButton.addEventListener('click', (e) => { e.stopPropagation(); startMenu.classList.toggle('hidden'); });
    document.addEventListener('click', (e) => { if (!startMenu.classList.contains('hidden') && !e.target.closest('#start-menu')) { startMenu.classList.add('hidden'); } });
    startMenu.querySelectorAll('li[data-program]').forEach(item => { item.addEventListener('click', () => { createWindow(item.dataset.program); startMenu.classList.add('hidden'); }); });
    desktop.querySelectorAll('.desktop-icon').forEach((icon, index) => {
        makeDraggable(icon, true);
        // Default grid layout
        const maxIconsPerColumn = Math.floor((desktop.clientHeight - 30) / 100);
        icon.style.left = `${15 + (Math.floor(index / maxIconsPerColumn) * 100)}px`;
        icon.style.top = `${15 + ((index % maxIconsPerColumn) * 100)}px`;
        icon.addEventListener('dblclick', () => createWindow(icon.dataset.program));
        icon.addEventListener('click', () => {
            desktop.querySelectorAll('.desktop-icon.selected').forEach(sel => sel.classList.remove('selected'));
            icon.classList.add('selected');
        });
        // Right-click properties menu
        icon.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            createWindow('properties', { targetProgram: icon.dataset.program });
        });
    });
});