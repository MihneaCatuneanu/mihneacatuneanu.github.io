// ========== Terminal Game ==========
const terminalGame = {
    currentDir: '~',
    commandHistory: [],
    historyIndex: -1,

    fileSystem: {
        '~': {
            type: 'dir',
            files: ['documents', 'downloads', '.hidden', 'readme.txt']
        },
        '~/documents': {
            type: 'dir',
            files: ['work', 'personal', 'notes.txt']
        },
        '~/documents/work': {
            type: 'dir',
            files: ['project1.txt', 'project2.txt']
        },
        '~/documents/personal': {
            type: 'dir',
            files: ['diary.txt']
        },
        '~/downloads': {
            type: 'dir',
            files: ['software.zip', 'image.png']
        },
        '~/.hidden': {
            type: 'dir',
            files: ['.secret', 'config.ini']
        },
        '~/.hidden/.secret': {
            type: 'dir',
            files: ['flag.txt', 'decoy.txt']
        }
    },

    fileContents: {
        '~/readme.txt': 'Welcome to the system! Look around and explore.\nSomething valuable might be hidden...',
        '~/documents/notes.txt': 'Note to self: Remember to check hidden directories.',
        '~/documents/work/project1.txt': 'Project Alpha - Status: Completed',
        '~/documents/work/project2.txt': 'Project Beta - Status: In Progress',
        '~/documents/personal/diary.txt': 'Today I learned about hidden files in Unix systems...',
        '~/downloads/software.zip': 'Binary data... [Cannot display]',
        '~/downloads/image.png': 'Image data... [Cannot display]',
        '~/.hidden/config.ini': '[Settings]\ntheme=dark\nlanguage=en',
        '~/.hidden/.secret/decoy.txt': 'Nice try! But this is not the flag.',
        '~/.hidden/.secret/flag.txt': '🎉 CONGRATULATIONS! 🎉\n\nYou found the hidden flag!\n\nFLAG{y0u_4r3_4_r34l_h4ck3r_m1hn34}\n\nWell done, Security Analyst!\nYou demonstrated:\n✓ File system navigation\n✓ Hidden file discovery\n✓ Persistence and curiosity\n\nThese are essential cybersecurity skills!'
    },

    commands: {
        help: () => {
            return `Available commands:
  ls [-a]        - List files in current directory (-a shows hidden)
  cd <dir>       - Change directory
  pwd            - Print working directory
  cat <file>     - Display file contents
  clear          - Clear terminal
  whoami         - Display current user
  help           - Show this help message
  hint           - Get a hint for finding the flag`;
        },

        ls: (args) => {
            const showHidden = args.includes('-a');
            const files = terminalGame.fileSystem[terminalGame.currentDir]?.files || [];

            return files
                .filter(file => showHidden || !file.startsWith('.'))
                .map(file => {
                    const fullPath = terminalGame.currentDir === '~'
                        ? `~/${file}`
                        : `${terminalGame.currentDir}/${file}`;
                    const isDir = terminalGame.fileSystem[fullPath];
                    return isDir ? `<span style="color: #4ec9b0;">${file}/</span>` : file;
                })
                .join('  ') || 'Directory is empty';
        },

        pwd: () => terminalGame.currentDir,

        cd: (args) => {
            if (!args.length || args[0] === '~') {
                terminalGame.currentDir = '~';
                return '';
            }

            const target = args[0];

            if (target === '..') {
                const parts = terminalGame.currentDir.split('/');
                if (parts.length > 1) {
                    parts.pop();
                    terminalGame.currentDir = parts.join('/') || '~';
                }
                return '';
            }

            const newPath = terminalGame.currentDir === '~'
                ? `~/${target}`
                : `${terminalGame.currentDir}/${target}`;

            if (terminalGame.fileSystem[newPath]) {
                terminalGame.currentDir = newPath;
                return '';
            }

            return `<span class="terminal-error">cd: ${target}: No such directory</span>`;
        },

        cat: (args) => {
            if (!args.length) {
                return '<span class="terminal-error">cat: missing file operand</span>';
            }

            const fileName = args[0];
            const filePath = terminalGame.currentDir === '~'
                ? `~/${fileName}`
                : `${terminalGame.currentDir}/${fileName}`;

            const content = terminalGame.fileContents[filePath];

            if (content !== undefined) {
                if (filePath === '~/.hidden/.secret/flag.txt') {
                    return `<span class="flag-animation">${content}</span>`;
                }
                return `<span class="terminal-success">${content}</span>`;
            }

            return `<span class="terminal-error">cat: ${fileName}: No such file or directory</span>`;
        },

        clear: () => {
            document.querySelector('.terminal-output').innerHTML = '';
            return null;
        },

        whoami: () => 'visitor',

        hint: () => {
            const hints = [
                'Try exploring with "ls -a" to see ALL files...',
                'Hidden files in Unix start with a dot (.)',
                'Use "cd" to navigate into directories',
                'The flag might be deeply nested... keep exploring!',
                'Remember: "cd .." goes back one directory'
            ];
            return `<span class="terminal-hint">${hints[Math.floor(Math.random() * hints.length)]}</span>`;
        }
    },

    executeCommand: (input) => {
        const [cmd, ...args] = input.trim().split(/\s+/);

        if (!cmd) return '';

        if (terminalGame.commands[cmd]) {
            const result = terminalGame.commands[cmd](args);
            return result !== null ? result : null;
        }

        return `<span class="terminal-error">Command not found: ${cmd}. Type 'help' for available commands.</span>`;
    },

    addOutput: (text, isCommand = false) => {
        if (text === null) return;

        const output = document.querySelector('.terminal-output');
        const line = document.createElement('p');

        if (isCommand) {
            line.innerHTML = `<span class="terminal-prompt">visitor@security-terminal:${terminalGame.currentDir}$</span> ${text}`;
            line.className = 'terminal-command';
        } else {
            line.innerHTML = text;
        }

        output.appendChild(line);
        document.querySelector('.terminal-body').scrollTop = document.querySelector('.terminal-body').scrollHeight;
    }
};

// Initialize terminal game
document.addEventListener('DOMContentLoaded', () => {
    const terminalInput = document.getElementById('terminalInput');

    if (terminalInput) {
        terminalInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const input = terminalInput.value;
                terminalGame.commandHistory.push(input);
                terminalGame.historyIndex = terminalGame.commandHistory.length;

                terminalGame.addOutput(input, true);

                const result = terminalGame.executeCommand(input);
                if (result !== null) {
                    terminalGame.addOutput(result);
                }

                terminalInput.value = '';
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                if (terminalGame.historyIndex > 0) {
                    terminalGame.historyIndex--;
                    terminalInput.value = terminalGame.commandHistory[terminalGame.historyIndex];
                }
            } else if (e.key === 'ArrowDown') {
                e.preventDefault();
                if (terminalGame.historyIndex < terminalGame.commandHistory.length - 1) {
                    terminalGame.historyIndex++;
                    terminalInput.value = terminalGame.commandHistory[terminalGame.historyIndex];
                } else {
                    terminalGame.historyIndex = terminalGame.commandHistory.length;
                    terminalInput.value = '';
                }
            }
        });

        // Auto-focus terminal input when clicking anywhere in terminal
        document.querySelector('.terminal-body')?.addEventListener('click', () => {
            terminalInput.focus();
        });
    }
});
