import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head />
        <body>
          <Main />
          <NextScript />
          {/* <script src="https://apis.google.com/js/api.js"></script> */}
        </body>
      </Html>
    );
  }
}

export default MyDocument;
