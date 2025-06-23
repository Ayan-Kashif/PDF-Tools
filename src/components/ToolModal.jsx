import React,{ useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

// const ToolModal = ({ tool, onClose }) => {

//   const [isProcessing, setIsProcessing] = useState(false);
//   const [progress, setProgress] = useState(0);
//   const [error, setError] = useState(null);
//   const [additionalParams, setAdditionalParams] = useState({});
//   const downloadRef = useRef(null);
//   const fileInputRef = useRef(null);

//   // Reset state when tool changes
//   useEffect(() => {
//     setFiles([]);
//     setProgress(0);
//     setError(null);
//     setAdditionalParams({});
//   }, [tool]);

//   const handleFileChange = (e) => {
//     const selectedFiles = Array.from(e.target.files);

//     // Basic validation
//     if (tool.id === 'merge-pdf' && selectedFiles.length < 2) {
//       setError('Please select at least 2 files for merging');
//       return;
//     }

//     setFiles(selectedFiles);
//     setError(null);
//   };

//   const handleParamChange = (paramName, value) => {
//     setAdditionalParams(prev => ({
//       ...prev,
//       [paramName]: value
//     }));
//   };

// const processFiles = async () => {
//   if (files.length === 0) {
//     setError('Please select at least one file');
//     return;
//   }

//   setIsProcessing(true);
//   setProgress(0);
//   setError(null);

//   try {
//     const formData = new FormData();

//     // Add files based on endpoint requirements
//     if (['merge-pdf', 'jpg-to-pdf'].includes(tool.id)) {
//       files.forEach(file => formData.append('files', file));
//     } else {
//       formData.append('file', files[0]);
//     }

//     // Add additional parameters
//     // if (tool.id === 'organize-pdf') {
//     //   formData.append('pageOrder', additionalParams.pageOrder || '1,2,3');
//     // }
//     // {tool.id === 'edit-pdf' && (
//     //             <>
//     //               <div style={{ marginBottom: '1rem' }}>
//     //                 <label style={{ display: 'block', color: '#94a3b8', marginBottom: '0.5rem' }}>
//     //                   Text to add:
//     //                 </label>
//     //                 <input
//     //                   type="text"
//     //                   placeholder="Enter text"
//     //                   style={{
//     //                     width: '100%',
//     //                     padding: '0.75rem',
//     //                     borderRadius: '8px',
//     //                     border: '1px solid #334155',
//     //                     background: '#1e293b',
//     //                     color: 'white'
//     //                   }}
//     //                   onChange={(e) => handleParamChange('text', e.target.value)}
//     //                 />
//     //               </div>
//     //               <div style={{ marginBottom: '1rem' }}>
//     //                 <label style={{ display: 'block', color: '#94a3b8', marginBottom: '0.5rem' }}>
//     //                   Position:
//     //                 </label>
//     //                 <select
//     //                   style={{
//     //                     width: '100%',
//     //                     padding: '0.75rem',
//     //                     borderRadius: '8px',
//     //                     border: '1px solid #334155',
//     //                     background: '#1e293b',
//     //                     color: 'white'
//     //                   }}
//     //                   onChange={(e) => handleParamChange('position', e.target.value)}
//     //                 >
//     //                   <option value="center">Center</option>
//     //                   <option value="top">Top</option>
//     //                   <option value="bottom">Bottom</option>
//     //                 </select>
//     //               </div>
//     //             </>
//     //           )}

//     //  {tool.id === 'rotate-pdf' && (
//     //     <div style={{ marginBottom: '1rem' }}>
//     //       <label style={{ display: 'block', color: '#94a3b8', marginBottom: '0.5rem' }}>
//     //         Rotation Angle:
//     //       </label>
//     //       <select
//     //         style={{
//     //           width: '100%',
//     //           padding: '0.75rem',
//     //           borderRadius: '8px',
//     //           border: '1px solid #334155',
//     //           background: '#1e293b',
//     //           color: 'white'
//     //         }}
//     //         onChange={(e) => handleParamChange('angle', e.target.value)}
//     //       >
//     //         <option value="90">90°</option>
//     //         <option value="180">180°</option>
//     //         <option value="270">270°</option>
//     //       </select>
//     //     </div>
//     //   )}

//     //   {tool.id === 'add-watermark' && (
//     //     <div style={{ marginBottom: '1rem' }}>
//     //       <label style={{ display: 'block', color: '#94a3b8', marginBottom: '0.5rem' }}>
//     //         Watermark Text:
//     //       </label>
//     //       <input
//     //         type="text"
//     //         placeholder="Enter watermark text"
//     //         style={{
//     //           width: '100%',
//     //           padding: '0.75rem',
//     //           borderRadius: '8px',
//     //           border: '1px solid #334155',
//     //           background: '#1e293b',
//     //           color: 'white'
//     //         }}
//     //         onChange={(e) => handleParamChange('text', e.target.value)}
//     //       />
//     //     </div>
//     //   )}



//     // Debug: Log what we're sending
//     console.log('Sending to backend:', {
//       toolId: tool.id,
//       fileCount: files.length,
//       params: additionalParams
//     });

//     const endpointMap = {
//       'merge-pdf': '/api/pdf/merge',
//       'split-pdf': '/api/pdf/split',
//       'compress-pdf': '/api/pdf/compress',
//       'pdf-to-word': '/api/pdf/toWord',
//       'pdf-to-ppt': '/api/pdf/toPowerPoint',
//       'protect-pdf': '/api/pdf/protect',
//       'word-to-pdf': '/api/pdf/fromWord',
//       'pdf-to-jpg': '/api/pdf/toJpg',
//       'jpg-to-pdf': '/api/pdf/fromJpg',
//       'organize-pdf': '/api/pdf/organize',
//       'edit-pdf': '/api/pdf/edit',
//       'rotate-pdf': '/api/pdf/rotate',
//       'add-watermark': '/api/pdf/watermark',
//       'add-numbers': '/api/pdf/addNumbers'
//     };

//     const baseURL = process.env.NODE_ENV === 'development'
//       ? 'http://localhost:5000'
//       : ''; // Empty for production

//     const response = await axios.post(
//       `${baseURL}${endpointMap[tool.id]}`, // Now includes full URL in dev
//       formData,
//       {
//         headers: { 'Content-Type': 'multipart/form-data' },
//         onUploadProgress: (progressEvent) => {
//           const percentCompleted = Math.round(
//             (progressEvent.loaded * 100) / progressEvent.total
//           );
//           setProgress(percentCompleted);
//         },
//         responseType: 'blob'
//       }
//     );

//     // Debug: Check response headers
//     console.log('Response headers:', response.headers);

//     // Handle potential JSON error responses
//     if (response.headers['content-type'].includes('application/json')) {
//       const errorData = JSON.parse(await response.data.text());
//       throw new Error(errorData.error || 'Unknown error from server');
//     }

//     // Successful file download
//     const url = window.URL.createObjectURL(new Blob([response.data]));
//     const link = document.createElement('a');
//     link.href = url;
//     link.setAttribute('download', `${tool.id}-result.pdf`);
//     document.body.appendChild(link);
//     link.click();
//     link.remove();

//   } catch (err) {
//     let errorMsg = 'Processing failed';

//     // Enhanced error parsing
//     if (err.response) {
//       try {
//         // Try to read error message from blob response
//         if (err.response.data instanceof Blob) {
//           const errorText = await err.response.data.text();
//           try {
//             const errorJson = JSON.parse(errorText);
//             errorMsg = errorJson.error || errorMsg;
//           } catch {
//             errorMsg = errorText || errorMsg;
//           }
//         }
//         // Handle other error formats
//         else if (err.response.data?.error) {
//           errorMsg = err.response.data.error;
//         } else if (typeof err.response.data === 'string') {
//           errorMsg = err.response.data;
//         }
//       } catch (parseErr) {
//         console.error('Error parsing error:', parseErr);
//         errorMsg = `Server error: ${err.response.status}`;
//       }
//     } else if (err.message) {
//       errorMsg = err.message;
//     }

//     console.error('Full error:', err);
//     setError(errorMsg);
//   } finally {
//     setIsProcessing(false);
//   }
// };
//   const triggerFileInput = () => {
//     fileInputRef.current.click();
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       exit={{ opacity: 0 }}
//       style={{
//         position: 'fixed',
//         top: 0,
//         left: 0,
//         right: 0,
//         bottom: 0,
//         backgroundColor: 'rgba(15, 23, 42, 0.8)',
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//         zIndex: 1000
//       }}
//     >
//       <motion.div
//         initial={{ y: 20 }}
//         animate={{ y: 0 }}
//         style={{
//           background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
//           borderRadius: '12px',
//           padding: '2rem',
//           width: '90%',
//           maxWidth: '500px',
//           border: '1px solid #334155',
//           position: 'relative'
//         }}
//       >
//         <h2 style={{ color: 'white', marginTop: 0 }}>
//           {tool.name}
//         </h2>

//         <div style={{ marginBottom: '1.5rem' }}>
//           <input
//             type="file"
//             ref={fileInputRef}
//             onChange={handleFileChange}
//             multiple={['merge-pdf', 'jpg-to-pdf'].includes(tool.id)}
//             accept={getAcceptFileTypes(tool.id)}
//             style={{ display: 'none' }}
//           />
//           <button
//             onClick={triggerFileInput}
//             style={{
//               display: 'block',
//               width: '100%',
//               padding: '1rem',
//               border: '2px dashed #334155',
//               borderRadius: '8px',
//               background: 'transparent',
//               color: '#94a3b8',
//               cursor: 'pointer',
//               textAlign: 'center'
//             }}
//           >
//             {files.length > 0
//               ? `${files.length} file(s) selected`
//               : 'Click to select files'}
//           </button>
//         </div>

//         {/* Additional parameters for specific tools */}
//         {tool.id === 'organize-pdf' && (
//           <div style={{ marginBottom: '1rem' }}>
//             <label style={{ display: 'block', color: '#94a3b8', marginBottom: '0.5rem' }}>
//               Page Order (comma separated):
//             </label>
//             <input
//               type="text"
//               placeholder="e.g., 1,3,2"
//               style={{
//                 width: '100%',
//                 padding: '0.75rem',
//                 borderRadius: '8px',
//                 border: '1px solid #334155',
//                 background: '#1e293b',
//                 color: 'white'
//               }}
//               onChange={(e) => handleParamChange('pageOrder', e.target.value)}
//             />
//           </div>
//         )}

// {
//   tool.id === 'edit-pdf' && (
//     <>
//       <div style={{ marginBottom: '1rem' }}>
//         <label style={{ display: 'block', color: '#94a3b8', marginBottom: '0.5rem' }}>
//           Text to add:
//         </label>
//         <input
//           type="text"
//           placeholder="Enter text"
//           style={{
//             width: '100%',
//             padding: '0.75rem',
//             borderRadius: '8px',
//             border: '1px solid #334155',
//             background: '#1e293b',
//             color: 'white'
//           }}
//           onChange={(e) => handleParamChange('text', e.target.value)}
//         />
//       </div>
//       <div style={{ marginBottom: '1rem' }}>
//         <label style={{ display: 'block', color: '#94a3b8', marginBottom: '0.5rem' }}>
//           Position:
//         </label>
//         <select
//           style={{
//             width: '100%',
//             padding: '0.75rem',
//             borderRadius: '8px',
//             border: '1px solid #334155',
//             background: '#1e293b',
//             color: 'white'
//           }}
//           onChange={(e) => handleParamChange('position', e.target.value)}
//         >
//           <option value="center">Center</option>
//           <option value="top">Top</option>
//           <option value="bottom">Bottom</option>
//         </select>
//       </div>
//     </>
//   )
// }

// {
//   tool.id === 'rotate-pdf' && (
//     <div style={{ marginBottom: '1rem' }}>
//       <label style={{ display: 'block', color: '#94a3b8', marginBottom: '0.5rem' }}>
//         Rotation Angle:
//       </label>
//       <select
//         style={{
//           width: '100%',
//           padding: '0.75rem',
//           borderRadius: '8px',
//           border: '1px solid #334155',
//           background: '#1e293b',
//           color: 'white'
//         }}
//         onChange={(e) => handleParamChange('angle', e.target.value)}
//       >
//         <option value="90">90°</option>
//         <option value="180">180°</option>
//         <option value="270">270°</option>
//       </select>
//     </div>
//   )
// }

// {
//   tool.id === 'add-watermark' && (
//     <div style={{ marginBottom: '1rem' }}>
//       <label style={{ display: 'block', color: '#94a3b8', marginBottom: '0.5rem' }}>
//         Watermark Text:
//       </label>
//       <input
//         type="text"
//         placeholder="Enter watermark text"
//         style={{
//           width: '100%',
//           padding: '0.75rem',
//           borderRadius: '8px',
//           border: '1px solid #334155',
//           background: '#1e293b',
//           color: 'white'
//         }}
//         onChange={(e) => handleParamChange('text', e.target.value)}
//       />
//     </div>
//   )
// }

// {
//   error && (
//     <div style={{
//       color: '#f87171',
//       marginBottom: '1rem',
//       textAlign: 'center'
//     }}>
//       {error}
//     </div>
//   )
// }

// {
//   isProcessing && (
//     <div style={{ marginBottom: '1rem' }}>
//       <div style={{
//         height: '4px',
//         background: '#334155',
//         borderRadius: '2px',
//         overflow: 'hidden'
//       }}>
//         <motion.div
//           initial={{ width: 0 }}
//           animate={{ width: `${progress}%` }}
//           style={{
//             height: '100%',
//             background: '#42f8f5'
//           }}
//         />
//       </div>
//       <p style={{ color: '#94a3b8', textAlign: 'center', marginTop: '0.5rem' }}>
//         Processing... {progress}%
//       </p>
//     </div>
//   )
// }

//         <div style={{ display: 'flex', gap: '1rem' }}>
//           <button
//             onClick={onClose}
//             style={{
//               flex: 1,
//               padding: '0.75rem',
//               background: 'transparent',
//               border: '1px solid #334155',
//               borderRadius: '8px',
//               color: 'white',
//               cursor: 'pointer'
//             }}
//           >
//             Cancel
//           </button>
//           <button
//             onClick={processFiles}
//             disabled={isProcessing || files.length === 0}
//             style={{
//               flex: 1,
//               padding: '0.75rem',
//               background: isProcessing || files.length === 0 ? '#334155' : '#42f8f5',
//               border: 'none',
//               borderRadius: '8px',
//               color: isProcessing || files.length === 0 ? '#94a3b8' : '#0f172a',
//               fontWeight: 600,
//               cursor: isProcessing || files.length === 0 ? 'not-allowed' : 'pointer'
//             }}
//           >
//             {isProcessing ? 'Processing...' : 'Process Files'}
//           </button>
//         </div>

//         <button
//           onClick={onClose}
//           style={{
//             position: 'absolute',
//             top: '1rem',
//             right: '1rem',
//             background: 'none',
//             border: 'none',
//             color: '#94a3b8',
//             fontSize: '1.5rem',
//             cursor: 'pointer'
//           }}
//         >
//           ×
//         </button>

//         <a ref={downloadRef} style={{ display: 'none' }} />
//       </motion.div>
//     </motion.div>
//   );
// };

// Helper function to determine accepted file types
const getAcceptFileTypes = (toolId) => {
  switch (toolId) {
    case 'word-to-pdf':
      return '.doc,.docx';
    case 'jpg-to-pdf':
      return 'image/jpeg,image/png';
    case 'pdf-to-word':
    case 'merge-pdf':
    case 'split-pdf':
    case 'compress-pdf':
    case 'organize-pdf':
    case 'edit-pdf':
    case 'rotate-pdf':
    case 'add-watermark':
    case 'add-numbers':
      return '.pdf';
    default:
      return '*';
  }
};

// export default ToolModal;
































const ToolModal = ({ tool, onClose }) => {
  const [files, setFiles] = useState([]);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [additionalParams, setAdditionalParams] = useState({});
  const [utilityResult, setUtilityResult] = useState(null);
  const fileInputRef = useRef(null);
  const [timerState, setTimerState] = useState(12)
  const [passwordOptions, setPasswordOptions] = useState({})
  const [inputText, setInputText] = useState('')
  const [selectedColor, setSelectedColor] = useState()
  const [unlockPassword, setUnlockPassword] = useState('');
  const [unlockPasswordError, setUnlockPasswordError] = useState('');

  const [showCopied, setShowCopied] = useState(false)
  // Reset state when tool changes
  useEffect(() => {
    setFiles([]);
    setProgress(0);
    setError(null);
    setAdditionalParams({});
    setUtilityResult(null);
  }, [tool]);
  const handleParamChange = (paramName, value) => {
    setAdditionalParams(prev => ({
      ...prev,
      [paramName]: value
    }));
  };

  const processFiles = async () => {
    if (files.length === 0) {
      setError('Please select at least one file');
      return;

    }

    if (tool.id === 'protect-pdf') {
      // Validate passwords
      if (password !== confirmPassword) {
        setPasswordError('Passwords do not match');
        return;
      }
      if (password.length < 4) {
        setPasswordError('Password must be at least 4 characters');
        return;
      }
    }

    setIsProcessing(true);
    setProgress(0);
    setError(null);

    try {
      const formData = new FormData();

      // Add files based on endpoint requirements
      const fieldName = ['merge-pdf', 'jpg-to-pdf'].includes(tool.id)
        ? 'files'  // plural for these tools
        : 'file';  // singular for others
      // For password protection only
      if (tool.id === 'protect-pdf') {
        formData.append('password', password);
      }

      if (tool.id === 'unlock-pdf') {
        if (!unlockPassword.trim()) {
          setUnlockPasswordError('Password is required');
          return; // stop form submission
        }
      }

      if (tool.id === 'unlock-pdf') {
        formData.append('password', unlockPassword);

      }
      if (tool.id === 'organize-pdf') {
        formData.append('pageOrder', additionalParams.pageOrder);

      }
      console.log('Watermark text being sent:', additionalParams); // Check thi
      if (tool.id === 'add-watermark') {
        formData.append('text', additionalParams.text);

      }
      if (tool.id === 'edit-pdf') {
        formData.append('text', additionalParams.text);

      }


      console.log(`Using field name: ${fieldName} for tool ${tool.id}`); // Debug log




      // Handle multiple files for tools that need it
      if (fieldName === 'files') {
        files.forEach(file => {
          console.log(`Appending ${file.name} to field ${fieldName}`);
          formData.append(fieldName, file);
        });
      } else {
        console.log(`Appending single file ${files[0]?.name} to field ${fieldName}`);
        formData.append(fieldName, files[0]);
      }


      // Add additional parameters

      if (additionalParams?.pageOrder) {
        formData.append('pageOrder', additionalParams.pageOrder);
      } else {
        console.error('No pageOrder provided');
      }

      {
        tool.id === 'protect-pdf' && (
          <>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', color: '#94a3b8', marginBottom: '0.5rem' }}>
                Password:
              </label>
              <input
                type="password"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: '8px',
                  border: '1px solid #334155',
                  background: '#1e293b',
                  color: 'white'
                }}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setPasswordError('');
                }}
              />
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', color: '#94a3b8', marginBottom: '0.5rem' }}>
                Confirm Password:
              </label>
              <input
                type="password"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: '8px',
                  border: '1px solid #334155',
                  background: '#1e293b',
                  color: 'white'
                }}
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  setPasswordError('');
                }}
              />
              {passwordError && (
                <p style={{ color: '#f87171', marginTop: '0.5rem' }}>{passwordError}</p>
              )}
            </div>
          </>
        )
      }



      {
        tool.id === 'edit-pdf' && (
          <>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', color: '#94a3b8', marginBottom: '0.5rem' }}>
                Text to add:
              </label>
              <input
                type="text"
                placeholder="Enter text"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: '8px',
                  border: '1px solid #334155',
                  background: '#1e293b',
                  color: 'white'
                }}
                onChange={(e) => handleParamChange('text', e.target.value)}
              />
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', color: '#94a3b8', marginBottom: '0.5rem' }}>
                Position:
              </label>
              <select
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: '8px',
                  border: '1px solid #334155',
                  background: '#1e293b',
                  color: 'white'
                }}
                onChange={(e) => handleParamChange('position', e.target.value)}
              >
                <option value="center">Center</option>
                <option value="top">Top</option>
                <option value="bottom">Bottom</option>
              </select>
            </div>
          </>
        )
      }

      {
        tool.id === 'rotate-pdf' && (
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', color: '#94a3b8', marginBottom: '0.5rem' }}>
              Rotation Angle:
            </label>
            <select
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: '8px',
                border: '1px solid #334155',
                background: '#1e293b',
                color: 'white'
              }}
              onChange={(e) => handleParamChange('angle', e.target.value)}
            >
              <option value="90">90°</option>
              <option value="180">180°</option>
              <option value="270">270°</option>
            </select>
          </div>
        )
      }

      {
        tool.id === 'add-watermark' && (
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', color: '#94a3b8', marginBottom: '0.5rem' }}>
              Watermark Text:
            </label>
            <input
              type="text"
              placeholder="Enter watermark text"
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: '8px',
                border: '1px solid #334155',
                background: '#1e293b',
                color: 'white'
              }}
              onChange={(e) => handleParamChange('text', e.target.value)}
            />
          </div>
        )
      }




      // Debug: Log what we're sending
      console.log('Sending to backend:', {
        toolId: tool.id,
        fileCount: files.length,
        params: additionalParams
      });

      const endpointMap = {
        'merge-pdf': '/api/pdf/merge',
        'split-pdf': '/api/pdf/split',
        'compress-pdf': '/api/pdf/compress',
        'pdf-to-word': '/api/pdf/toWord',
        'pdf-to-ppt': '/api/pdf/toPowerPoint',
        'protect-pdf': '/api/pdf/protect',
        'word-to-pdf': '/api/pdf/fromWord',
        'excel-to-pdf': '/api/pdf/fromExcel',
        'ppt-to-pdf': '/api/pdf/fromPowerPoint',

        'unlock-pdf': '/api/pdf/unlock',
        'video-compressor': '/api/utility/compress-video',

        'pdf-to-excel': '/api/pdf/toExcel',
        'image-compressor': '/api/pdf/compressImg',
        'qr-generator': '/api/pdf/qrCode',

        'pdf-to-jpg': '/api/pdf/toJpg',
        'jpg-to-pdf': '/api/pdf/fromJpg',
        'organize-pdf': '/api/pdf/organize',
        'edit-pdf': '/api/pdf/edit',
        'rotate-pdf': '/api/pdf/rotate',
        'add-watermark': '/api/pdf/watermark',
        'add-numbers': '/api/pdf/addNumbers'
      };

     const baseURL = import.meta.env.VITE_APP_API_URL
      // Add this right before the axios.post call
      console.log('FormData contents:');
      for (let [key, value] of formData.entries()) {
        console.log(key, value);
      }


      const response = await axios.post(
        `${baseURL}${endpointMap[tool.id]}`, // Now includes full URL in dev
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setProgress(percentCompleted);
          },
          responseType: 'blob'
        }
      );

      // Debug: Check response headers
      console.log('Response headers:', response.headers);

      // Handle potential JSON error responses
      if (response.headers['content-type'].includes('application/json')) {
        const errorData = JSON.parse(await response.data.text());
        throw new Error(errorData.error || 'Unknown error from server');
      }

      // Successful file download
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      let filename = 'downloaded-file';
      const disposition = response.headers['content-disposition'];

      if (disposition && disposition.includes('filename=')) {
        const match = disposition.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/);
        if (match && match[1]) {
          filename = match[1].replace(/['"]/g, ''); // Remove any quotes
        }
      } else {
        // Fallbacks based on tool type
        switch (tool.id) {
          case 'pdf-to-ppt':
            filename = 'converted.pptx';
            break;
          case 'pdf-to-word':
            filename = 'converted.docx';
            break;
          case 'pdf-to-excel':
            filename = 'converted.xlsx'
            break;
          case 'pdf-to-jpg':
            filename = 'converted.zip'; // ✅ correct extension
            break;
          case 'split-pdf':
            filename = 'converted.zip'; // ✅ correct extension
            break;

          default:
            filename = `${tool.id}-result.pdf`;
        }
      }

      link.setAttribute('download', filename);


      document.body.appendChild(link);
      link.click();
      link.remove();

    } catch (err) {
      let errorMsg = 'Processing failed';

      // Enhanced error parsing
      if (err.response) {
        try {
          // Try to read error message from blob response
          if (err.response.data instanceof Blob) {
            const errorText = await err.response.data.text();
            try {
              const errorJson = JSON.parse(errorText);
              errorMsg = errorJson.error || errorMsg;
            } catch {
              errorMsg = errorText || errorMsg;
            }
          }
          // Handle other error formats
          else if (err.response.data?.error) {
            errorMsg = err.response.data.error;
          } else if (typeof err.response.data === 'string') {
            errorMsg = err.response.data;
          }
        } catch (parseErr) {
          console.error('Error parsing error:', parseErr);
          errorMsg = `Server error: ${err.response.status}`;
        }
      } else if (err.message) {
        errorMsg = err.message;
      }

      console.error('Full error:', err);
      setError(errorMsg);
    } finally {
      setIsProcessing(false);
    }
  };
  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);
    setError(null);
  };
  // Add this helper function at the top of your file
  const getToolType = (toolId) => {
    const fileBasedTools = [
      'merge-pdf', 'split-pdf', 'compress-pdf', 'pdf-to-word', 'word-to-pdf',
      'pdf-to-ppt', 'ppt-to-pdf', 'pdf-to-excel', 'excel-to-pdf', 'pdf-to-jpg',
      'jpg-to-pdf', 'organize-pdf', 'edit-pdf', 'rotate-pdf', 'unlock-pdf',
      'protect-pdf', 'add-watermark', 'image-compressor', 'image-converter',
      'audio-converter', 'video-compressor'
    ];

    return fileBasedTools.includes(toolId) ? 'file' : 'utility';
  };


  function formatTime(timeInMs, options = {}) {
    const {
      showMs = true,
      leadingZeros = true,
      format = 'mm:ss.ms'
    } = options;

    // Ensure time is a number
    const time = Math.max(0, Number(timeInMs)) || 0;

    // Calculate time components
    const hours = Math.floor(time / 3600000);
    const minutes = Math.floor((time % 3600000) / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = Math.floor(time % 1000);

    // Format components with leading zeros
    const pad = (num, length = 2) =>
      leadingZeros ? num.toString().padStart(length, '0') : num.toString();

    // Build the formatted string based on requested format
    switch (format) {
      case 'hh:mm:ss':
        return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;

      case 'mm:ss':
        return `${pad(minutes)}:${pad(seconds)}`;

      case 'hh:mm:ss.ms':
        return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${pad(milliseconds, 3)}`;

      case 'mm:ss.ms':
      default:
        if (showMs) {
          const ms = Math.floor(milliseconds / 10); // Show 2 digits for ms (centiseconds)
          return `${pad(minutes)}:${pad(seconds)}.${pad(ms)}`;
        }
        return `${pad(minutes)}:${pad(seconds)}`;
    }
  }

  const processUtilityTool = () => {
    setIsProcessing(true);
    setError(null);

    try {
      // Simulate processing delay
      setTimeout(async () => {
        let result;

        switch (tool.id) {
          case 'password-generator':
            result = generatePassword(additionalParams);
            break;
          case 'age-calculator':
            result = calculateAge(additionalParams.birthDate);
            break;
          case 'bmi-calculator':
            result = calculateBMI(additionalParams.weight, additionalParams.height);
            break;
          case 'json-formatter':
            result = formatJSON(additionalParams.jsonInput);
            break;
          case 'unit-converter':
            result = convertUnits(additionalParams.value, additionalParams.fromUnit, additionalParams.toUnit);
            break;
          case 'timer':
            // Timer would be handled differently with real-time updates
            result = 'Timer started';
            break;
          case 'qr-generator':
            const response = await axios.post('http://localhost:5000/api/pdf/qrCode', { text: additionalParams.text });
            result = response.data.image; // base64 string
            break;
          default:
            throw new Error('Unsupported utility tool');
        }

        setUtilityResult(result);
        setIsProcessing(false);
      }, 1000);
    } catch (err) {
      setError(err.message);
      setIsProcessing(false);
    }
  };

  // Utility functions implementations
  // Utility functions implementations
  const generatePassword = (params) => {
    const length = params.length || 12;
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
    let password = '';
    for (let i = 0; i < length; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
  };

  const startTimer = () => {
    // If timer is paused (has existing time but not running)
    if (timerState.time > 0 && !timerState.isRunning) {
      setTimerState(prev => ({
        ...prev,
        isRunning: true,
        startTime: Date.now() - prev.time, // Adjust start time to account for existing time
        laps: prev.laps // Preserve existing laps
      }));
      return;
    }

    // If timer is at 0 (fresh start)
    if (timerState.time === 0) {
      setTimerState({
        time: 0,
        isRunning: true,
        startTime: Date.now(),
        lapStartTime: Date.now(), // For lap calculations
        laps: []
      });
      return;
    }

    // If timer is already running, do nothing
    if (timerState.isRunning) {
      return;
    }
  };

  const resetTimer = () => {
    // Clear any running interval immediately
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    // Reset all timer state to initial values
    setTimerState({
      time: 0,
      isRunning: false,
      startTime: null,
      lapStartTime: null,
      laps: [],
      lastLapTime: null
    });

    // Additional cleanup if needed (e.g., animation frames)
    if (animationFrameId.current) {
      cancelAnimationFrame(animationFrameId.current);
      animationFrameId.current = null;
    }
  };

  const calculateAge = (birthDate) => {
    if (!birthDate) throw new Error('Birth date is required');
    const birth = new Date(birthDate);
    const now = new Date();
    let age = now.getFullYear() - birth.getFullYear();
    const monthDiff = now.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < birth.getDate())) {
      age--;
    }
    return `${age} years`;
  };

  const calculateBMI = (weight, height) => {
    if (!weight || !height) throw new Error('Weight and height are required');
    const bmi = (weight / ((height / 100) ** 2)).toFixed(1);
    return `BMI: ${bmi}`;
  };

  const formatJSON = (jsonInput) => {
    if (!jsonInput) throw new Error('JSON input is required');
    try {
      const parsed = JSON.parse(jsonInput);
      return JSON.stringify(parsed, null, 2);
    } catch (err) {
      throw new Error('Invalid JSON format');
    }
  };

  const convertUnits = (value, fromUnit, toUnit) => {
    if (!value || !fromUnit || !toUnit) throw new Error('All fields are required');
    // Simplified conversion - you'd implement actual conversion logic
    return `${value} ${fromUnit} = ${(value * 1.5)} ${toUnit}`; // Example conversion
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const renderFileBasedTool = () => (
    <>
      <div className='' style={{ marginBottom: '1.5rem' }}>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          multiple={['merge-pdf', 'jpg-to-pdf'].includes(tool.id)}
          accept={getAcceptFileTypes(tool.id)}
          style={{ display: 'none' }}
        />
        <button
          onClick={triggerFileInput}
          style={{
            display: 'block',
            width: '100%',
            padding: '1rem',
            border: '2px dashed #334155',
            borderRadius: '8px',
            background: 'transparent',
            color: '#94a3b8',
            cursor: 'pointer',
            textAlign: 'center'
          }}
        >
          {files.length > 0
            ? `${files.length} file(s) selected`
            : 'Click to select files'}
        </button>
      </div>

      {/* Additional parameters for specific tools */}
      {tool.id === 'organize-pdf' && (
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', color: '#94a3b8', marginBottom: '0.5rem' }}>
            Page Order (comma separated):
          </label>
          <input
            type="text"
            style={{
              width: '100%',
              padding: '0.75rem',
              borderRadius: '8px',
              border: '1px solid #334155',
              background: '#1e293b',
              color: 'white'
            }}
            placeholder="e.g., 1,3,2"
            onChange={(e) => handleParamChange('pageOrder', e.target.value)}
          />
        </div>
      )}



      {tool.id === 'edit-pdf' && (
        <>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', color: '#94a3b8', marginBottom: '0.5rem' }}>
              Text to add:
            </label>
            <input
              type="text"
              placeholder="Enter text"
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: '8px',
                border: '1px solid #334155',
                background: '#1e293b',
                color: 'white'
              }}
              onChange={(e) => handleParamChange('text', e.target.value)}
            />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', color: '#94a3b8', marginBottom: '0.5rem' }}>
              Position:
            </label>
            <select
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: '8px',
                border: '1px solid #334155',
                background: '#1e293b',
                color: 'white'
              }}
              onChange={(e) => handleParamChange('position', e.target.value)}
            >
              <option value="center">Center</option>
              <option value="top">Top</option>
              <option value="bottom">Bottom</option>
            </select>
          </div>
        </>
      )}



      {tool.id === 'rotate-pdf' && (
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', color: '#94a3b8', marginBottom: '0.5rem' }}>
            Rotation Angle:
          </label>
          <select
            style={{
              width: '100%',
              padding: '0.75rem',
              borderRadius: '8px',
              border: '1px solid #334155',
              background: '#1e293b',
              color: 'white'
            }}
            onChange={(e) => handleParamChange('angle', e.target.value)}
          >
            <option value="90">90°</option>
            <option value="180">180°</option>
            <option value="270">270°</option>
          </select>
        </div>
      )}

      {tool.id === 'add-watermark' && (
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', color: '#94a3b8', marginBottom: '0.5rem' }}>
            Watermark Text:
          </label>
          <input
            type="text"
            placeholder="Enter watermark text"
            style={{
              width: '100%',
              padding: '0.75rem',
              borderRadius: '8px',
              border: '1px solid #334155',
              background: '#1e293b',
              color: 'white'
            }}
            onChange={(e) => handleParamChange('text', e.target.value)}
          />
        </div>
      )}
      {
        tool.id === 'protect-pdf' && (
          <>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', color: '#94a3b8', marginBottom: '0.5rem' }}>
                Password:
              </label>
              <input
                type="password"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: '8px',
                  border: '1px solid #334155',
                  background: '#1e293b',
                  color: 'white'
                }}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setPasswordError('');
                }}
              />
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', color: '#94a3b8', marginBottom: '0.5rem' }}>
                Confirm Password:
              </label>
              <input
                type="password"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: '8px',
                  border: '1px solid #334155',
                  background: '#1e293b',
                  color: 'white'
                }}
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  setPasswordError('');
                }}
              />
              {passwordError && (
                <p style={{ color: '#f87171', marginTop: '0.5rem' }}>{passwordError}</p>
              )}
            </div>
          </>
        )
      }
      {
        tool.id === 'unlock-pdf' && (
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', color: '#94a3b8', marginBottom: '0.5rem' }}>
              Enter PDF Password:
            </label>
            <input
              type="password"
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: '8px',
                border: '1px solid #334155',
                background: '#1e293b',
                color: 'white'
              }}
              value={unlockPassword}
              onChange={(e) => {
                setUnlockPassword(e.target.value);
                setUnlockPasswordError('');
              }}
            />
            {unlockPasswordError && (
              <p style={{ color: '#f87171', marginTop: '0.5rem' }}>{'Invalid Password'}</p>
            )}
          </div>
        )
      }


      {/* ... other file-based Real place tool parameters ... */}

    </>
  );

  const renderUtilityTool = () => {
    switch (tool.id) {
      case 'password-generator':

        return (
          <>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', color: '#94a3b8', marginBottom: '0.5rem' }}>
                Password Length:
              </label>
              <input
                type="number"
                min="8"
                max="32"
                className='px-16 py-3 bg-gray-800'
                defaultValue="12"
                onChange={(e) => handleParamChange('length', e.target.value)}
              />
            </div>
            {utilityResult && (
              <div style={{ marginBottom: '1rem', background: '#1e293b', padding: '1rem', borderRadius: '8px' }}>
                <p style={{ color: '#94a3b8', marginBottom: '0.5rem' }}>Generated Password:</p>
                <p style={{ color: '#42f8f5', fontSize: '1.2rem', wordBreak: 'break-all' }}>{utilityResult}</p>
                <button onClick={() => navigator.clipboard.writeText(utilityResult)}>
                  Copy to Clipboard
                </button>
              </div>
            )}
          </>
        );

      case 'qr-generator':
        return (
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{
              display: 'block',
              color: '#94a3b8',
              fontWeight: '500',
              marginBottom: '0.5rem'
            }}>
              Text or URL for QR Code:
            </label>
            <input
              type="text"
              placeholder="Enter text or link to encode"
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                borderRadius: '10px',
                border: '1px solid #334155',
                backgroundColor: '#0f172a',
                color: '#f8fafc',
                fontSize: '1rem',
                outline: 'none'
              }}
              onChange={(e) => handleParamChange('text', e.target.value)}
            />
          </div>
        )


      case 'age-calculator':
        return (
          <div className="tool-container">
            <div className="input-group">
              <label>Birth Date</label>
              <input
                type="date"
                className="modern-input"
                onChange={(e) => handleParamChange('birthDate', e.target.value)}
                max={new Date().toISOString().split('T')[0]}
              />
            </div>
            {utilityResult && (
              <div className="result-card">
                <div className="result-value">{utilityResult}</div>
                <div className="result-label">Your Age</div>
              </div>
            )}
            <button
              className="action-button"
              onClick={processUtilityTool}
              disabled={!additionalParams.birthDate || isProcessing}
            >
              {isProcessing ? 'Processing' : 'Calculate Age'}

            </button>
          </div>
        );

      case 'bmi-calculator':
        return (
          <div className="tool-container">
            <div className="input-row">
              <div className="input-group">
                <label>Weight (kg)</label>
                <input
                  type="number"
                  step="0.1"
                  min="30"
                  max="300"
                  className="modern-input"
                  onChange={(e) => handleParamChange('weight', e.target.value)}
                />
              </div>
              <div className="input-group">
                <label>Height (cm)</label>
                <input
                  type="number"
                  step="0.1"
                  min="100"
                  max="250"
                  className="modern-input"
                  onChange={(e) => handleParamChange('height', e.target.value)}
                />
              </div>
            </div>
            {utilityResult && (
              <div className={`result-card ${utilityResult.includes('Underweight') ? 'warning' :
                utilityResult.includes('Overweight') ? 'caution' : 'healthy'}`}>
                <div className="result-value">{utilityResult.split(':')[0]}</div>
                <div className="result-label">{utilityResult.split(':')[1]}</div>
              </div>
            )}
            <button
              className="action-button"
              onClick={processUtilityTool}
              disabled={!additionalParams.weight || !additionalParams.height || isProcessing}
            >
              {isProcessing ? 'Processing' : 'Calculate BMI'}
            </button>
          </div>
        );

      case 'json-formatter':
        return (
          <div className="tool-container">
            <div className="input-group">
              <label>JSON Input</label>
              <textarea
                rows="6"
                className="modern-textarea"
                onChange={(e) => handleParamChange('jsonInput', e.target.value)}
                placeholder='{"key":"value"}'
              />
            </div>
            {utilityResult && (
              <div className="result-container">
                <div className="result-header">
                  <span>Formatted JSON</span>
                  <button
                    className="copy-button"
                    onClick={() => {
                      navigator.clipboard.writeText(utilityResult);
                      setUtilityResult(prev => ({ ...prev, copied: true }));
                      setTimeout(() => setUtilityResult(prev => ({ ...prev, copied: false })), 2000);
                    }}
                  >
                    {utilityResult.copied ? '✓ Copied' : 'Copy'}
                  </button>
                </div>
                <pre className="json-output">
                  {utilityResult}
                </pre>
              </div>
            )}
            <button
              className="action-button"
              onClick={processUtilityTool}
              disabled={!additionalParams.jsonInput || isProcessing}
            >
              {isProcessing ? 'Processing' : 'Format JSON'}
            </button>
          </div>
        );

      case 'unit-converter':
        return (
          <div className="tool-container">
            <div className="input-row">
              <div className="input-group">
                <label>Value</label>
                <input
                  type="number"
                  step="0.01"
                  className="modern-input"
                  onChange={(e) => handleParamChange('value', e.target.value)}
                />
              </div>
            </div>
            <div className="input-row">
              <div className="input-group">
                <label>From</label>
                <select
                  className="modern-select"
                  onChange={(e) => handleParamChange('fromUnit', e.target.value)}
                >
                  <option value="cm">Centimeters</option>
                  <option value="in">Inches</option>
                  <option value="m">Meters</option>
                  <option value="ft">Feet</option>
                  <option value="km">Kilometers</option>
                  <option value="mi">Miles</option>
                </select>
              </div>
              <div className="swap-icon" onClick={() => {
                const temp = additionalParams.fromUnit;
                handleParamChange('fromUnit', additionalParams.toUnit);
                handleParamChange('toUnit', temp);
              }}>
                ⇄
              </div>
              <div className="input-group">
                <label>To</label>
                <select
                  className="modern-select"
                  onChange={(e) => handleParamChange('toUnit', e.target.value)}
                >
                  <option value="in">Inches</option>
                  <option value="cm">Centimeters</option>
                  <option value="ft">Feet</option>
                  <option value="m">Meters</option>
                  <option value="mi">Miles</option>
                  <option value="km">Kilometers</option>
                </select>
              </div>
            </div>
            {utilityResult && (
              <div className="result-card">
                <div className="result-value">{utilityResult}</div>
              </div>
            )}
            <button
              className="action-button"
              onClick={processUtilityTool}
              disabled={!additionalParams.value || !additionalParams.fromUnit || !additionalParams.toUnit || isProcessing}
            >
              {isProcessing ? 'Processing' : 'Convert'}
            </button>
          </div>
        );
      case 'word-counter':
        return (
          <div className="tool-container">
            <div className="input-group">
              <label>Enter Text</label>
              <textarea
                rows="8"
                className="modern-textarea"
                value={inputText}
                onChange={(e) => {
                  setInputText(e.target.value);
                  // Real-time counting
                  const text = e.target.value;
                  const charCount = text.length;
                  const wordCount = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
                  const lineCount = text === '' ? 0 : text.split('\n').length;
                  setUtilityResult({
                    characters: charCount,
                    words: wordCount,
                    lines: lineCount,
                    spaces: (text.match(/ /g) || []).length
                  });
                }}
                placeholder="Type or paste your text here..."
              />
            </div>

            {utilityResult && (
              <div className="word-counter-results">
                <div className="result-grid">
                  <div className="result-card">
                    <div className="result-value">{utilityResult.words}</div>
                    <div className="result-label">Words</div>
                  </div>
                  <div className="result-card">
                    <div className="result-value">{utilityResult.characters}</div>
                    <div className="result-label">Characters</div>
                  </div>
                  <div className="result-card">
                    <div className="result-value">{utilityResult.spaces}</div>
                    <div className="result-label">Spaces</div>
                  </div>
                  <div className="result-card">
                    <div className="result-value">{utilityResult.lines}</div>
                    <div className="result-label">Lines</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        );

      case 'color-picker':
        return (
          <div className="tool-container py-8 mt-6 relative top-16">
            <div className="color-picker-container">
              <div className="color-display" style={{
                backgroundColor: selectedColor,
                boxShadow: `0 0 12px ${selectedColor}80`
              }} />

              <input
                type="color"
                value={selectedColor}

                onChange={(e) => {
                  setSelectedColor(e.target.value);
                  setUtilityResult({
                    hex: e.target.value,
                    rgb: hexToRgb(e.target.value),
                    hsl: hexToHsl(e.target.value)
                  });
                }}
                className="color-input"
              />

              <div className="color-input-group">
                <input
                  type="text"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    borderRadius: '8px',
                    border: '1px solid #334155',
                    background: '#1e293b',
                    color: 'white'
                  }}
                  value={selectedColor}
                  onChange={(e) => {
                    const color = e.target.value;
                    if (/^#[0-9A-F]{6}$/i.test(color)) {
                      setSelectedColor(color);
                      setUtilityResult({
                        hex: color,
                        rgb: hexToRgb(color),
                        hsl: hexToHsl(color)
                      });
                    }
                  }}
                  className="color-hex-input"
                  placeholder="#RRGGBB"
                />
                <button
                  className="copy-button px-5 text-xl mt-4  "

                  onClick={() => {
                    navigator.clipboard.writeText(selectedColor);
                    setShowCopied(true);
                    setTimeout(() => setShowCopied(false), 2000);
                  }}
                >
                  {showCopied ? '✓ Copied' : 'Copy'}
                </button>
              </div>
            </div>

            {utilityResult && (
              <div className="color-values">
                <div className="color-value-group">
                  <label>RGB</label>
                  <div className="color-value">
                    {utilityResult.rgb}
                    <button
                      className="copy-button small"
                      onClick={() => navigator.clipboard.writeText(utilityResult.rgb)}
                    >
                      Copy
                    </button>
                  </div>
                </div>
                <div className="color-value-group">
                  <label>HSL</label>
                  <div className="color-value">
                    {utilityResult.hsl}
                    <button
                      className="copy-button small"
                      onClick={() => navigator.clipboard.writeText(utilityResult.hsl)}
                    >
                      Copy
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        );

      case 'timer':
        return (
          <div className="timer-container">
            <div className="timer-display">
              {formatTime(timerState.time)}
            </div>
            <div className="timer-controls">
              {!timerState.isRunning ? (
                <button
                  className="timer-button primary"
                  onClick={startTimer}
                >
                  Start
                </button>
              ) : (
                <button
                  className="timer-button warning"
                  onClick={pauseTimer}
                >
                  Pause
                </button>
              )}
              <button
                className="timer-button secondary"
                onClick={resetTimer}
                disabled={timerState.time === 0}
              >
                Reset
              </button>
              <button
                className="timer-button"
                onClick={() => setShowLapModal(true)}
                disabled={!timerState.isRunning && timerState.time === 0}
              >
                Lap
              </button>
            </div>

            {timerState.laps.length > 0 && (
              <div className="laps-container">
                <div className="laps-header">
                  <span>Lap</span>
                  <span>Time</span>
                </div>
                {timerState.laps.map((lap, index) => (
                  <div key={index} className="lap-item">
                    <span>Lap {index + 1}</span>
                    <span>{formatTime(lap)}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      default:
        return (
          <div className="empty-state">
            <div className="empty-icon">🛠️</div>
            <p>Tool interface coming soon</p>
          </div>
        );
    }
  }
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(15, 23, 42, 0.8)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000
      }}
    >
      <motion.div
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        style={{
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
          borderRadius: '12px',
          padding: '2rem',
          width: '90%',
          maxWidth: '500px',
          border: '1px solid #334155',
          position: 'relative'
        }}
      >
        <h2 style={{ color: 'white', marginTop: 0 }}>
          {tool.name}
        </h2>

        {getToolType(tool.id) === 'file' ? renderFileBasedTool() : renderUtilityTool()}

        {error && (
          <div style={{
            color: '#f87171',
            marginBottom: '1rem',
            textAlign: 'center'
          }}>
            {error}
          </div>
        )}

        {isProcessing && (
          <div style={{ marginBottom: '1rem' }}>
            <div style={{
              height: '4px',
              background: '#334155',
              borderRadius: '2px',
              overflow: 'hidden'
            }}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                style={{
                  height: '100%',
                  background: '#42f8f5'
                }}
              />
            </div>
            <p style={{ color: '#94a3b8', textAlign: 'center', marginTop: '0.5rem' }}>
              Processing... {progress}%
            </p>
          </div>
        )}

        <div style={{ display: 'flex', gap: '1rem' }}>
          <button
            onClick={onClose}
            style={{
              flex: 1,
              padding: '0.75rem',
              background: 'transparent',
              border: '1px solid #334155',
              borderRadius: '8px',
              color: 'white',
              cursor: 'pointer'
            }}
          >
            Cancel
          </button>
          {getToolType(tool.id) === 'file' ? (
            <button
              onClick={processFiles}
              disabled={isProcessing || files.length === 0}
              style={{
                flex: 1,
                padding: '0.75rem',
                background: isProcessing || files.length === 0 ? '#334155' : '#42f8f5',
                border: 'none',
                borderRadius: '8px',
                color: isProcessing || files.length === 0 ? '#94a3b8' : '#0f172a',
                fontWeight: 600,
                cursor: isProcessing || files.length === 0 ? 'not-allowed' : 'pointer'
              }}
            >
              {isProcessing ? 'Processing...' : 'Process Files'}
            </button>
          ) : (
            <button
              onClick={processUtilityTool}
              disabled={isProcessing}
              style={{
                flex: 1,
                padding: '0.75rem',
                background: isProcessing ? '#334155' : '#42f8f5',
                border: 'none',
                borderRadius: '8px',
                color: isProcessing ? '#94a3b8' : '#0f172a',
                fontWeight: 600,
                cursor: isProcessing ? 'not-allowed' : 'pointer'
              }}
            >
              {isProcessing ? 'Processing...' : 'Calculate'}
            </button>
          )}
        </div>

        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            background: 'none',
            border: 'none',
            color: '#94a3b8',
            fontSize: '1.5rem',
            cursor: 'pointer'
          }}
        >
          ×
        </button>
      </motion.div>
    </motion.div>
  );
};

export default ToolModal;
