/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-console */
import React from 'react';
import { useEffect, useRef } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import Box from '@mui/material/Box';
import './styles.css'; // Import the CSS file
import { useNavigate } from 'react-router-dom';

// type QRCodeScannerProps = {
//   // onScanSuccess: (decodedText: string) => void;
//   // onScanFailure: (decodedText: string) => void;
// };

// function QRCodeScanner(props: QRCodeScannerProps) {
function QRScanner() {
  const [windowHeight, setWindowHeight] = React.useState(window.innerHeight);

  useEffect(() => {
    // Create an event listener to update the windowHeight state when the window is resized
    const handleResize = () => {
      setWindowHeight(window.innerHeight);
    };

    // Attach the event listener to the window
    window.addEventListener('resize', handleResize);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const navigate = useNavigate();

  const html5QrCodeRef = useRef<HTMLDivElement>(null);
  // const { onScanSuccess, onScanFailure } = props;

  function onScanSuccess(decodedText: any, decodedResult: any) {
    // handle the scanned code as you like, for example:
    console.log(`Code matched = ${decodedText}`, decodedResult);

    if (decodedText.includes('verify-result')) {
      const searchText = 'verify-result';
      const params = decodedText.substring(
        decodedText.indexOf(searchText) + searchText.length + 1
      );
      navigate(`/verify-result/${params}`);
    }
  }

  function onScanFailure(error: any) {
    // handle scan failure, usually better to ignore and keep scanning.
    // for example:
    console.warn(`Code scan error = ${error}`);
  }

  //   const handleStart = () => {
  //     let html5QrcodeScanner: Html5QrcodeScanner | null = null;

  //     const startQRCodeScanner = async () => {
  //       try {
  //         html5QrcodeScanner = new Html5QrcodeScanner(
  //           'qr-reader',
  //           { fps: 10, qrbox: { width: 250, height: 250 } },
  //           /* verbose= */ false
  //         );

  //         html5QrcodeScanner.render(onScanSuccess, onScanFailure);
  //       } catch (error) {
  //         console.error('Error starting QR code scanner:', error);
  //       }
  //     };
  //   };

  useEffect(() => {
    let html5QrcodeScanner: Html5QrcodeScanner | null = null;

    const startQRCodeScanner = async () => {
      try {
        html5QrcodeScanner = new Html5QrcodeScanner(
          'qr-reader',
          { fps: 10, qrbox: { width: 250, height: 250 } },
          /* verbose= */ false
        );

        html5QrcodeScanner.render(onScanSuccess, onScanFailure);
      } catch (error) {
        console.error('Error starting QR code scanner:', error);
      }
    };

    startQRCodeScanner();

    return () => {
      if (html5QrcodeScanner) {
        html5QrcodeScanner.clear();
      }
    };
  }, []);

  return (
    <Box
      sx={{ margin: 1, height: `${windowHeight - 190}px` }}
      ref={html5QrCodeRef}
      id="qr-reader"
    />
  );
}

export default QRScanner;
