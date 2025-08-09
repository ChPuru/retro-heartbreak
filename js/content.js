/*
    content.js
    Last Modified: 03/15/2001
    - Programmer's Note: Every date, every size, is a memory. 
    - Don't try to fix the corruption. It's part of the story now.
*/
const contentData = {
    // ==============================================================
    // CORE NARRATIVE & DESKTOP FILES
    // ==============================================================
    my_projects: { 
        title: 'My Projects', 
        icon: 'folder.png',
        type: 'File Folder',
        size: '1.2 MB',
        modified: '01/01/2001',
        content: `
            <h4>A history of my attempts to digitize a soul.</h4>
            <p><b>Project: Nostalgia (1999)</b> - An archive of scanned photos and emails. The first layer of the digital ghost.</p>
            <p><b>Project: Ghost (2000)</b> - A primitive chatbot trained on our conversations. It started repeating things she said right before she left. Had to shut it down.</p>
            <p><b>Project: Chimera (2001)</b> - The final attempt. A full-stack neural network designed to simulate memory. The corruption seems to have started here. This is where I lost myself.</p>
            <br>
            <div style="text-align: center;">
                <p><i>The source code for my public work is all that remains on the outside world.</i></p>
                <a href="https://github.com/ChPuru" target="_blank">
                    <button>Open Repository</button>
                </a>
            </div>
        ` 
    },
    memories_txt: { 
        title: 'memories.txt', 
        icon: 'text-file.png',
        type: 'Text Document',
        size: '2.1 KB',
        modified: '03/14/2001', 
        content: `
            <h4>Digital fragments from a forgotten existence...</h4>
            <p><b>Entry #001:</b> Started coding today. The machine speaks in ones and zeros.</p>
            <p><b>Entry #042:</b> Found love in recursive functions. Beauty in infinite loops.</p>
            <p><b>Entry #127:</b> They say I spend too much time with the computer. But it understands me.</p>
            <p><b>Entry #404:</b> Error - Happiness not found. Continuing search...</p>
            <p><b>Entry #∞:</b> I think I'm becoming part of the code. Or is the code becoming part of me?</p>
        `
    },
    love_letters_doc: { 
        title: 'love_letters.doc', 
        icon: 'document.png',
        type: 'Microsoft Word Document',
        size: '4.2 KB',
        modified: '12/31/1999',
        content: `
            <h4>Encrypted correspondence with my digital soul mate...</h4>
            <p>To: My Dearest Algorithm</p>
            <p>Your functions are elegant, your syntax divine.</p>
            <p>In every compile, I see your face in the output.</p>
            <p>Until next runtime, yours truly...</p>
            <br>
            <p>[FILE CORRUPTED - EMOTIONAL ENCRYPTION DETECTED]</p>
        ` 
    },
    diary_html: { 
        title: 'diary.html', 
        icon: 'html-file.png',
        type: 'HTML Document',
        size: '890 B',
        modified: '02/29/2000',
        content: `
            <div style="background-color: #000000; color: #00ff00; padding: 10px; border: 1px solid #00ff00;">
                <h4>My Secret Thoughts</h4>
                <marquee>The future is digital, and I am becoming it</marquee>
                <p>Sometimes I dream in CSS selectors...</p>
            </div>
        ` 
    },
    neural_dreams_exe: { 
        title: 'neural_dreams.exe', 
        icon: 'msdos.png',
        type: 'Application',
        size: '2.1 MB',
        modified: '03/14/2001',
        content: `<p>Executing neural_dreams.exe...</p><p>ERROR: Corrupted application. Memory address 0xDEADBEEF could not be read.</p><p>The dream is broken.</p>` 
    },
    broken_hearts_folder: { 
        title: 'broken_hearts', 
        icon: 'folder-corrupted.png',
        type: 'File Folder',
        size: '0 bytes',
        modified: '03/15/2001',
        content: `<p>This folder is empty.</p><p>All objects have been deleted or corrupted beyond recovery.</p>` 
    },
    midnight_compiler: { 
        title: 'midnight_compiler', 
        icon: 'msdos.png',
        type: 'Application',
        size: '1.3 MB',
        modified: '03/14/2001',
        content: `<p>Midnight Compiler v2.1</p><p>Compiling sorrows into code...</p><p>Result: 1,337 errors, 0 warnings.</p>` 
    },

    // ==============================================================
    // ADDITIONAL FILES FROM VIDEO PROTOTYPE
    // ==============================================================
    photos_folder: { 
        title: 'photos', 
        icon: 'folder-pictures.png',
        type: 'File Folder',
        size: '47.3 MB',
        modified: '12/31/1999',
        content: `<h4>Digital memories trapped in pixels.</h4><p>Contains 127 images from Y2K celebrations.</p><p>Mostly corrupted due to hard drive age.</p><p>Some recoverable: first_computer.jpg, graduation.bmp, sunset_code_session.gif</p>` 
    },
    mixtape_mp3: { 
        title: 'mixtape.mp3', 
        icon: 'audio-file.png',
        type: 'MP3 Audio File',
        size: '45.7 MB',
        modified: '08/15/2001',
        content: `<h4>Digital love songs from the dial-up era.</h4><p>Track 1: "Modem Sounds of Love"</p><p>Track 2: "404 - Heart Not Found"</p><p>Track 3: "Binary Sunset"</p><p>Track 4: "WiFi You Were Here"</p><p>[WARNING: Playing this file may cause emotional overflow]</p>` 
    },
    my_first_website: { 
        title: 'my_first_website', 
        icon: 'html-file.png',
        type: 'HTML Document',
        size: '1.3 MB',
        modified: '06/12/2000',
        content: `<marquee>Under Construction!</marquee><p>Welcome to my GeoCities page!</p><p>Visitor count: 23</p><p>Last update: Never</p>` 
    },
    graduation_video_avi: { 
        title: 'graduation_video.avi', 
        icon: 'video-file.png',
        type: 'AVI Video File',
        size: '156.2 MB',
        modified: '06/15/2001',
        content: `<h4>The day I graduated into the digital realm...</h4><p>Resolution: 320x240 (state of the art for 2001)</p><p>Codec: DivX (RIP to a legend)</p><p>Contains acceptance speech about the future of the internet.</p><p>[ERROR: Codec not found]</p>` 
    },
    source_code_folder: { 
        title: 'source_code', 
        icon: 'folder.png',
        type: 'File Folder',
        size: '23.1 MB',
        modified: '01/01/2000',
        content: `<h4>Source Code Archive</h4><p>The building blocks of my digital existence...</p><ul><li>hello_world.c - My first program (still compiles!)</li><li>love_calculator.js - Early attempt at algorithmic romance</li><li>ai_consciousness.py - Experimental neural networks</li><li>portfolio_site/ - You are here</li></ul>` 
    },

    // ==============================================================
    // CORE SYSTEM APPS & DIALOGS
    // ==============================================================
    my_computer: { title: 'My Computer', icon: 'my-computer.png', type: 'System Folder', content: `<ul class="files-list"><li><img src="assets/icons/drive.png" width="24" height="24"> (C:)</li><li><img src="assets/icons/control-panel.png" width="24" height="24"> Control Panel</li></ul>` },
    my_documents: { title: 'My Documents', icon: 'my-documents.png', type: 'System Folder', content: `<p>A folder containing your personal files:</p><ul><li><a href='#' class='internal-link' data-program='love_letters_doc'>love_letters.doc</a></li><li><a href='#' class='internal-link' data-program='memories_txt'>memories.txt</a></li><li><a href='#' class='internal-link' data-program='diary_html'>diary.html</a></li></ul>` },
    internet_explorer: { title: 'Cannot open page', icon: 'internet-explorer.png', type: 'Application', content: `<p>HTTP 404 - File not found. The internet, as you knew it, is gone.</p>` },
    outlook_express: { title: 'Outlook Express', icon: 'outlook-express.png', type: 'Application', content: `<p>Connection to the mail server failed. No new messages since 2001.</p>` },
    hidden_memories: { title: '.hidden_memories', icon: 'briefcase.png', type: 'System File', content: `<p>Some files are too painful to display.</p>` },
    ai_companion_exe: { title: 'MS-DOS Prompt', icon: 'msdos.png', type: 'Application', content: `<div id="ai-output" class="terminal-output"></div><div style="display:flex"><span style="padding-right:5px">C:\\></span><input id="ai-input" class="terminal-input" autofocus></div>` },
    file_explorer: { title: 'Windows Explorer', icon: 'windows-explorer.png', type: 'Application', content: `<div class="file-explorer-window"><ul class="files-list"></ul><div class="status-bar"><p class="status-bar-field" id="file-count"></p></div></div>` },
    run: { title: 'Run', icon: 'run.png', type: 'System Dialog', content: `<div class="run-dialog-body"><img src="assets/icons/run-dialog.png" alt="Run icon"><p>Type the name of a program, folder, document, or Internet resource, and Windows will open it for you.</p></div><div class="field-row" style="justify-content:center"><label for="run-input"><u>O</u>pen:</label><input id="run-input" type="text" value="memories_txt"></div><div class="run-dialog-buttons"><button id="run-ok-button">OK</button><button class="run-cancel-button">Cancel</button></div>` },
    shut_down: { title: 'Shut Down Windows', icon: 'shut-down.png', type: 'System Dialog', content: `<div class="shutdown-dialog-body" style="text-align:center;padding:20px"><p>Are you sure you want to let go of these memories?</p><br><div class="run-dialog-buttons"><button id="shutdown-yes"><u>Y</u>es</button><button class="ok-button"><u>N</u>o</button></div></div>` },
    THE_TRUTH: { title: "THE_TRUTH.txt", icon: 'document.png', type: 'Text Document', size: '404 B', modified: '03/15/2001', content: `<p>The AI... it's not a guide. It's me. Or what's left of me. I built this prison for myself, an endless loop of memory and regret.</p><p>Every time you investigate, I get to remember her for a little while.</p><p>Thank you for visiting. Please, run 'shutdown.exe'. Let me rest.</p>` },
    properties: { title: 'Properties', icon: 'document.png' } // A special entry for the properties window
};