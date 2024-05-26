import * as React from "react"
import type { HeadFC, PageProps } from "gatsby"
// import Papa from "papaparse"
import { useState } from "react"

const allowedExtensions = ["csv"]

const pageStyles = {
  color: "#232129",
  padding: 96,
  fontFamily: "-apple-system, Roboto, sans-serif, serif",
}
const headingStyles = {
  marginTop: 0,
  marginBottom: 64,
  maxWidth: 320,
}
const headingAccentStyles = {
  color: "#663399",
}
const paragraphStyles = {
  marginBottom: 48,
}
const codeStyles = {
  color: "#8A6534",
  padding: 4,
  backgroundColor: "#FFF4DB",
  fontSize: "1.25rem",
  borderRadius: 4,
}
const listStyles = {
  marginBottom: 96,
  paddingLeft: 0,
}
const doclistStyles = {
  paddingLeft: 0,
}
const listItemStyles = {
  fontWeight: 300,
  fontSize: 24,
  maxWidth: 560,
  marginBottom: 30,
}

const linkStyle = {
  color: "#8954A8",
  fontWeight: "bold",
  fontSize: 16,
  verticalAlign: "5%",
}

const docLinkStyle = {
  ...linkStyle,
  listStyleType: "none",
  display: `inline-block`,
  marginBottom: 24,
  marginRight: 12,
}

const descriptionStyle = {
  color: "#232129",
  fontSize: 14,
  marginTop: 10,
  marginBottom: 0,
  lineHeight: 1.25,
}

const docLinks = [
  {
    text: "TypeScript Documentation",
    url: "https://www.gatsbyjs.com/docs/how-to/custom-configuration/typescript/",
    color: "#8954A8",
  },
  {
    text: "GraphQL Typegen Documentation",
    url: "https://www.gatsbyjs.com/docs/how-to/local-development/graphql-typegen/",
    color: "#8954A8",
  }
]

const badgeStyle = {
  color: "#fff",
  backgroundColor: "#088413",
  border: "1px solid #088413",
  fontSize: 11,
  fontWeight: "bold",
  letterSpacing: 1,
  borderRadius: 4,
  padding: "4px 6px",
  display: "inline-block",
  position: "relative" as "relative",
  top: -2,
  marginLeft: 10,
  lineHeight: 1,
}

const IndexPage: React.FC<PageProps> = () => {
  const [text, setText] = useState("")

  // It state will contain the error when
  // correct file extension is not used
  const [error, setError] = useState("");

  // It will store the file uploaded by the user
  const [file, setFile] = useState<File>();

  // This function will be called when
  // the file input changes

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value)
    setText(e.target.value)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError("");

    // Check if user has entered the file
    if (e.target.files.length) {
      const inputFile = e.target.files[0];
      console.log(e.target.files)

      // Check the file extensions, if it not
      // included in the allowed extensions
      // we show the error
      const fileExtension =
        inputFile?.type.split("/")[1];
      if (
        !allowedExtensions.includes(fileExtension)
      ) {
        setError("Please input a csv file");
        return;
      }

      // If input type is correct set the state
      setFile(inputFile);
    }
  };
  const handleParse = () => {

    // If user clicks the parse button without
    // a file we show a error
    if (!file && !text) return alert("Enter a valid file or text");

    var csvFileInput = document.getElementById("csvFileInput");
    var textInput = document.getElementById("textInput");
    var predictionResult = document.getElementById("predictionResult");
    var graphContainer = document.getElementById("graphContainer");

    // Initialize a reader which allows user
    // to read any file or blob.
    if (file) {

      var formData = new FormData();
      formData.append("file", file);

      fetch("http://127.0.0.1:5000/predict", {
        mode: "no-cors",
        method: "POST",
        body: formData
      })
        .then(response => {
          if (response.headers.get('X-Graph-Exists') === 'true') {
            console.log("Graph")
            // var graphData = response.headers.get('X-Graph-Data');
            // displayGraph(graphData);
          }

          return response.blob();
        })
        .then(blob => {
          console.log("Blob:", blob);

          console.log(download)

          // document.getElementById("downloadBtn").style.display = "block";
          // document.getElementById("downloadBtn").onclick = function () {
            console.log("Downloading...");
            // var url = URL.createObjectURL(blob);
            console.log("URL:", url);

            // var a = document.createElement("a");
            // a.href = url;
            // a.download = "Predictions.csv";
            // document.body.appendChild(a);
            // a.click();
            // document.body.removeChild(a);
          // };
        })
        .catch(error => {
          console.error("Error:", error);
        });
    }
    else if (text) {
      // Predict on single sentence
      console.log("send rext")
      fetch("http://127.0.0.1:5000/predict", {
        mode: "no-cors",
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ "text": text.trim() })
      })
        .then(response => response.json())
        .then(data => {
          console.log(data)
          // predictionResult.innerHTML = "Predicted sentiment: " + data.prediction;
        });
    }
  };
  return (
    <main style={pageStyles}>
      <h1 style={headingStyles}>
        Sentiment
        <br />
        <span style={headingAccentStyles}> Analysis</span>
      </h1>
      <p style={paragraphStyles}>
        A site to predict the sentiment of any statement and provide graphical sentiment analysis for csv files.
        {/* Edit <code style={codeStyles}>src/pages/index.tsx</code> to see this page
        update in real-time. 😎 */}
      </p>
      <ul style={doclistStyles}>
        {docLinks.map(doc => (
          <li key={doc.url} style={docLinkStyle}>
            <a
              style={linkStyle}
              href={`${doc.url}?utm_source=starter&utm_medium=ts-docs&utm_campaign=minimal-starter-ts`}
            >
              {doc.text}
            </a>
          </li>
        ))}
      </ul>
      <div className="container">
        {/* <div>
          <label
            htmlFor="csvInput"
            style={{ display: "block" }}
          >
            Enter CSV File
          </label>
          <input
            onChange={handleFileChange}
            id="csvInput"
            name="file"
            type="File"
          />
        </div> */}
        <div>
          <label htmlFor="textInput">
            Enter your text
          </label>
          <input type="text" id="textInput" name="text" onChange={handleTextChange} />
        </div>
        <div>
          <button onClick={handleParse}>
            Submit
          </button>
        </div>
      </div>

      <img
        alt="Gatsby G Logo"
        src="data:image/svg+xml,%3Csvg width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M12 2a10 10 0 110 20 10 10 0 010-20zm0 2c-3.73 0-6.86 2.55-7.75 6L14 19.75c3.45-.89 6-4.02 6-7.75h-5.25v1.5h3.45a6.37 6.37 0 01-3.89 4.44L6.06 9.69C7 7.31 9.3 5.63 12 5.63c2.13 0 4 1.04 5.18 2.65l1.23-1.06A7.959 7.959 0 0012 4zm-8 8a8 8 0 008 8c.04 0 .09 0-8-8z' fill='%23639'/%3E%3C/svg%3E"
      />
    </main>
  )
}

export default IndexPage

export const Head: HeadFC = () => <title>Home Page</title>
