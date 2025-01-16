function browseSource() {
    document.getElementById('sourceFile').click();
}

function browseDestination() {
    // Create a directory input element
    const destinationInput = document.createElement('input');
    destinationInput.type = 'file';
    destinationInput.setAttribute('webkitdirectory', '');
    destinationInput.setAttribute('directory', '');
    destinationInput.style.display = 'none';

    document.body.appendChild(destinationInput);
    
    destinationInput.addEventListener('change', function(e) {
        if (e.target.files.length > 0) {
            // Get the full path of the selected directory
            const path = e.target.files[0].webkitRelativePath.split('/')[0];
            document.getElementById('destinationPath').value = path;
        }
        document.body.removeChild(destinationInput);
    });

    destinationInput.click();
}

async function transferFile() {
    const sourceFile = document.getElementById('sourceFile').files[0];
    const destinationPath = document.getElementById('destinationPath').value;
    
    if (!sourceFile || !destinationPath) {
        alert("Please select both source file and destination path");
        return;
    }

    try {
        // Create a handle to the destination directory
        const dirHandle = await window.showDirectoryPicker();
        
        // Create a new file in the destination directory
        const newFileHandle = await dirHandle.getFileHandle(sourceFile.name, { create: true });
        
        // Get writable stream for the new file
        const writable = await newFileHandle.createWritable();
        
        // Write the source file contents to destination
        await writable.write(sourceFile);
        await writable.close();
        
        simulateTransfer();
    } catch (err) {
        console.error('Error transferring file:', err);
        alert('Error transferring file. Please try again.');
    }
}

function simulateTransfer() {
    const progressFill = document.getElementById('progressFill');
    const statusMessage = document.getElementById('statusMessage');
    let progress = 0;

    const interval = setInterval(() => {
        progress += 10;
        progressFill.style.width = progress + '%';
        statusMessage.textContent = `Transferring: ${progress}%`;

        if (progress >= 100) {
            clearInterval(interval);
            statusMessage.textContent = "Transfer complete!";
        }
    }, 500);
}

// Update source path when file is selected
document.getElementById('sourceFile').addEventListener('change', function(e) {
    document.getElementById('sourcePath').value = e.target.files[0]?.name || '';
});
