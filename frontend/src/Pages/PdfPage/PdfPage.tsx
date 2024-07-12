import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useState,
  useRef,
} from "react";
// import { useResizeObserver } from "@wojtekmaj/react-hooks";
import { pdfjs, Document, Page } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import type { PDFDocumentProxy } from "pdfjs-dist";
import { BlobServiceClient } from "@azure/storage-blob";
import "./PdfPage.css";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import FormBar from "../../Components/FormBar/FormBar";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

const options = {
  cMapUrl: "/cmaps/",
  standardFontDataUrl: "/standard_fonts/",
};

const resizeObserverOptions = {};

const maxWidth = 800;

type PDFFile = string | File | null;

interface Props {}

const PdfPage = (props: Props) => {
  const [file, setFile] = useState<PDFFile>(null);
  const [numPages, setNumPages] = useState<number | undefined>();
  // const [containerRef, setContainerRef] = useState<HTMLElement | null>(null);
  const [containerWidth, setContainerWidth] = useState<number | undefined>();

  const onResize = useCallback((entries: ResizeObserverEntry[]) => {
    const [entry] = entries;

    if (entry) {
      setContainerWidth(entry.contentRect.width);
    }
  }, []);

  //   useResizeObserver(containerRef, resizeObserverOptions, onResize);
  useEffect(() => {
    const fetchAndDisplayPDF = async () => {
      const account = process.env.REACT_APP_AZURE_STORAGE_ACCOUNT;
      console.log("Banana", account);
      const sasToken = process.env.REACT_APP_AZURE_STORAGE_SAS;
      console.log("Banana", sasToken);
      const containerName = process.env.REACT_APP_AZURE_STORAGE_CONTAINER
        ? process.env.REACT_APP_AZURE_STORAGE_CONTAINER
        : "N/A";
      console.log("Banana", containerName);
      const blobServiceClient = new BlobServiceClient(
        `https://${account}.blob.core.windows.net/?${sasToken}`
      );
      const containerClient =
        blobServiceClient.getContainerClient(containerName);
      const blobName = "./20x45-Model.pdf"; // Example blob name
      const blockBlobClient = containerClient.getBlockBlobClient(blobName);

      try {
        const response = await fetch(blockBlobClient.url);
        const arrayBuffer = await response.arrayBuffer();
        const blobUrl = URL.createObjectURL(
          new Blob([arrayBuffer], { type: "application/pdf" })
        );
        setFile(blobUrl);
      } catch (error) {
        console.error("Failed to fetch PDF:", error);
      }
    };

    fetchAndDisplayPDF();
  }, []);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const captureScreenshot = () => {
    if (!containerRef.current) return;

    html2canvas(containerRef.current).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4", true);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 30;
      pdf.addImage(
        imgData,
        "PNG",
        imgX,
        imgY,
        imgWidth * ratio,
        imgHeight * ratio
      );
      pdf.save("invoice.pdf");
    });
  };

  function onFileChange(event: ChangeEvent<HTMLInputElement>): void {
    const { files } = event.target;

    const nextFile = files?.[0];

    if (nextFile) {
      setFile(nextFile);
    }
  }

  function onDocumentLoadSuccess({
    numPages: nextNumPages,
  }: PDFDocumentProxy): void {
    setNumPages(nextNumPages);
  }

  return (
    <div className="Example">
      <header>
        <h1>React-PDF Sample Page</h1>
      </header>
      <div className="Example__container" ref={containerRef}>
        <div className="Example__container__load">
          <label htmlFor="file">Load from file:</label>{" "}
          <input onChange={onFileChange} type="file" />
        </div>
        {/* Wrapper for PDF viewer and SVG  ref={setContainerRef}*/}
        <div className="overlay-wrapper" ref={containerRef}>
          <div className="Example__container__document">
            <Document
              file={file}
              onLoadSuccess={onDocumentLoadSuccess}
              options={options}
            >
              {Array.from({ length: numPages || 0 }, (_, index) => (
                <Page
                  key={`page_${index + 1}`}
                  pageNumber={index + 1}
                  width={
                    containerWidth
                      ? Math.min(containerWidth, maxWidth)
                      : maxWidth
                  }
                />
              ))}
            </Document>
          </div>
          {/* SVG Overlay */}
          <svg
            className="overlay-svg"
            viewBox="0 0 100 100"
            width="200"
            height="200"
          >
            {/* Insert your SVG here */}
            <circle
              cx="25"
              cy="25"
              r="20"
              stroke="black"
              strokeWidth="3"
              fill="red"
            />
          </svg>
        </div>
        <FormBar
          input1={"Room 1"}
          input2={"Room 2"}
          input3={"Room 3"}
          input4={"Room 4"}
        />
        <button onClick={captureScreenshot}>Take Screenshot</button>
      </div>
    </div>
  );
};

export default PdfPage;
