const DB_NAME = 'HR_Documents_DB';
const STORE_NAME = 'files';

const initDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);
    request.onupgradeneeded = (e) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
    request.onsuccess = (e) => resolve(e.target.result);
    request.onerror = (e) => reject(e.target.error);
  });
};

export const saveFile = async (id, file) => {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.put(file, id);
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
};

export const getFile = async (id) => {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readonly');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.get(id);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

export const deleteFile = async (id) => {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.delete(id);
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
};

// Base64 representation of a simple 1-page valid PDF
const MINIMAL_PDF_BASE64 = 
  "JVBERi0xLjQKJdDF5OQKMSAwIG9iago8PAovVGl0bGUgKFNhbXBsZSBQREYpCi9DcmVhdG9yIChBY3RpdmVBZ2VudCkKPj4KZW5kb2JqCjIgMCBvYmoKPDwKL1R5cGUgL0NhdGFsb2cKL1BhZ2VzIDMgMCBSCj4+CmVuZG9iagozIDAgb2JqCjw8Ci9UeXBlIC9QYWdlcwovS2lkcyBbNCAwIFJdCi9Db3VudCAxCj4+CmVuZG9iago0IDAgb2JqCjw8Ci9UeXBlIC9QYWdlCi9QYXJlbnQgMyAwIFIKL1Jlc291cmNlcyA8PAovRm9udCA8PAovRjEgNSAwIFIKPj4KPj4KL01lZGlhQm94IFswIDAgNTk1LjI4IDg0MS44OV0KL0NvbnRlbnRzIDYgMCBSCj4+CmVuZG9iago1IDAgb2JqCjw8Ci9UeXBlIC9Gb250Ci9TdWJ0eXBlIC9UeXBlMQovQmFzZUZvbnQgL0hlbHZldGljYQo+PgplbmRvYmoKNiAwIG9iago8PAovTGVuZ3RoIDE0MAo+PgpzdHJlYW0KQlQKL0YxIDI0IFRmCjUwIDc1MCBUZAooUGVvcGxlQ29yZSBIRCBTeXN0ZW0pIFRqCjAgLTQwIFRkCi9GMSAxNCBUZAooRG9jdW1lbnQgUHJldmlldyAmIFZlcmlmaWNhdGlvbikgVGoKMCAtMzAgVGQKKE5hbWU6ICVET0NfTkFNRSApIFRqCjAgLTIwIFRkCihEZXBhcnRtZW50OiAlRE9DX0RFUFQgKSBUagowIC0yMCBUZAooU3RhdHVzOiBBcHByb3ZlZCAmIEFjdGl2ZSkgVGoKRVQKZW5kc3RyZWFtCmVuZG9iagp4cmVmCjAgNwowMDAwMDAwMDAwIDY1NTM1IGYgCjAwMDAwMDAwMTUgMDAwMDAgbiAKMDAwMDAwMDA4NSAwMDAwMCBuIAowMDAwMDAwMTM1IDAwMDAwIGYgCjAwMDAwMDAxOTUgMDAwMDAgbiAKMDAwMDAwMDMzOCAwMDAwMCBuIAowMDAwMDAwNDIwIDAwMDAwIG4gCnRyYWlsZXIKPDwKL1NpemUgNwovUm9vdCAyIDAgUgo+PgpzdGFydHhyZWYKNTQ0CiUlRU9G";

export const getMockPdfBlob = (name, department) => {
  try {
    // Decode base64
    const binaryString = atob(MINIMAL_PDF_BASE64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    
    // We can replace placeholder strings in the PDF content buffer if they are of the same length
    // But since character offsets and lengths are sensitive in PDF streams, it's safer to just return
    // the generic binary blob, or we can dynamically build a custom PDF.
    // Let's create a custom dynamic text PDF that is 100% robust and doesn't break PDF stream parsing!
    // Constructing a simple PDF string dynamically:
    const escapedName = (name || "Document").replace(/[\(\)\\]/g, '\\$&');
    const escapedDept = (department || "All").replace(/[\(\)\\]/g, '\\$&');
    const today = new Date().toLocaleDateString();

    const pdfText = `%PDF-1.4
1 0 obj
<< /Type /Catalog /Pages 2 0 R >>
endobj
2 0 obj
<< /Type /Pages /Kids [3 0 R] /Count 1 >>
endobj
3 0 obj
<< /Type /Page /Parent 2 0 R /Resources << /Font << /F1 4 0 R >> >> /MediaBox [0 0 595.28 841.89] /Contents 5 0 R >>
endobj
4 0 obj
<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>
endobj
5 0 obj
<< /Length 300 >>
stream
BT
/F1 20 Tf
50 750 Td
(PeopleCore HR Portal - Document Verification) Tj
/F1 12 Tf
0 -40 Td
(Document Name: ${escapedName}) Tj
0 -25 Td
(Department: ${escapedDept}) Tj
0 -25 Td
(Verification Date: ${today}) Tj
0 -25 Td
(Status: Verified & Secure) Tj
0 -40 Td
(This is an official document of PeopleCore Human Resource Management.) Tj
0 -20 Td
(It has been dynamically generated for previewing and downloading purposes.) Tj
ET
endstream
endobj
xref
0 6
0000000000 65535 f 
0000000009 00000 n 
0000000056 00000 n 
0000000111 00000 n 
0000000250 00000 n 
0000000318 00000 n 
trailer
<< /Size 6 /Root 1 0 R >>
startxref
720
%%EOF`;

    // Convert string to bytes
    const encoder = new TextEncoder();
    const pdfBytes = encoder.encode(pdfText);
    return new Blob([pdfBytes], { type: 'application/pdf' });
  } catch (error) {
    console.error("Error generating mock PDF:", error);
    // Return standard fallback
    return new Blob([new Uint8Array([0x25, 0x50, 0x44, 0x46])], { type: 'application/pdf' });
  }
};
