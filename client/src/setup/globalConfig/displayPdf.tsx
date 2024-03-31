import React from "react";
import axios from "axios";

const PdfViewerComponent: React.FC = (props: any) => {
  const handleDownloadPdf = () => {
    if (props.pdfUrl) {
      axios({
        url: props.pdfUrl,
        method: "GET",
        responseType: "blob",
      })
        .then((response) => {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "document.pdf");
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        })
        .catch((error) => {
          console.error("Error downloading file:", error);
        });
    }
  };

  return (
    <div>
      {props.pdfUrl && (
        <div>
          <embed
            src={props.pdfUrl}
            type="application/pdf"
            width="100%"
            height="600px"
          />

          <button onClick={handleDownloadPdf}>Download PDF</button>
        </div>
      )}
    </div>
  );
};

export default PdfViewerComponent;
