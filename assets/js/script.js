document.addEventListener('DOMContentLoaded', () => {
    const fileInput = document.getElementById('fileInput');
    const fileUploadLabel = document.querySelector('.file-upload-label');
    const analyzeBtnWrapper = document.querySelector('.analyze-btn-wrapper');
  
    // Create a container to display the uploaded file name
    const fileNameDisplay = document.createElement('div');
    fileNameDisplay.style.marginBottom = '12px';
    fileNameDisplay.style.color = '#2C3E50';
    fileNameDisplay.style.fontSize = '12px';
    fileNameDisplay.style.fontWeight = '500';
    fileNameDisplay.style.display = 'none'; // Hide initially
    analyzeBtnWrapper.parentElement.insertBefore(fileNameDisplay, analyzeBtnWrapper);
  
    // Handle file selection via input change
    fileInput.addEventListener('change', handleFileUpload);
  
    // Handle drag and drop
    fileUploadLabel.addEventListener('dragover', (event) => {
      event.preventDefault();
      fileUploadLabel.classList.add('dragging');
    });
  
    fileUploadLabel.addEventListener('dragleave', () => {
      fileUploadLabel.classList.remove('dragging');
    });
  
    fileUploadLabel.addEventListener('drop', (event) => {
      event.preventDefault();
      fileUploadLabel.classList.remove('dragging');
      const files = event.dataTransfer.files;
      handleFileSelection(files);
    });
  
    // Function to handle file selection
    function handleFileUpload(event) {
      const files = event.target.files;
      handleFileSelection(files);
    }
  
    // Function to validate and display the file name
    function handleFileSelection(files) {
      if (files.length > 0) {
        const file = files[0];
  
        // Validate file type (only documents)
        const validTypes = ['application/pdf', 'application/msword',
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
  
        if (!validTypes.includes(file.type)) {
          fileNameDisplay.textContent = "Invalid file type. Please upload a document.";
          fileNameDisplay.style.display = 'block';
          return;
        }
  
        // Display the uploaded file name
        fileNameDisplay.textContent = `Uploaded: ${file.name}`;
        fileNameDisplay.style.display = 'block';
      } else {
        fileNameDisplay.style.display = 'none';
      }
    }
  });
  