import React, { useState } from "react";
import {
  Upload,
  File,
  FileText,
  Image as ImageIcon,
  X,
  Check,
  Clock,
} from "lucide-react";

const ReportUploader = ({ patientId, onUploadComplete }) => {
  const [files, setFiles] = useState([]);
  const [reportType, setReportType] = useState("lab");
  const [reportTitle, setReportTitle] = useState("");
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const reportTypes = [
    { id: "lab", label: "Lab Result" },
    { id: "imaging", label: "Imaging Report" },
    { id: "consultation", label: "Consultation Report" },
    { id: "procedure", label: "Procedure Report" },
    { id: "discharge", label: "Discharge Summary" },
    { id: "other", label: "Other Document" },
  ];

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);

    const newFiles = selectedFiles.map((file) => ({
      file,
      id: Date.now() + Math.random().toString(36).substring(2, 10),
      name: file.name,
      type: file.type,
      size: file.size,
      preview: file.type.startsWith("image/")
        ? URL.createObjectURL(file)
        : null,
    }));

    setFiles([...files, ...newFiles]);
  };

  const removeFile = (id) => {
    setFiles(files.filter((file) => file.id !== id));
  };

  const getFileIcon = (file) => {
    if (file.type.startsWith("image/")) {
      return <ImageIcon size={24} className="text-blue-500" />;
    } else if (file.type.includes("pdf")) {
      return <FileText size={24} className="text-red-500" />;
    } else {
      return <File size={24} className="text-gray-500" />;
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + " B";
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";
    else return (bytes / 1048576).toFixed(1) + " MB";
  };

  const handleUpload = () => {
    if (files.length === 0 || !reportTitle) {
      return;
    }

    setUploading(true);

    // Simulate upload progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += 5;
      setUploadProgress(progress);

      if (progress >= 100) {
        clearInterval(interval);

        // Simulate a small delay before completion
        setTimeout(() => {
          onUploadComplete({
            patientId,
            reportType,
            title: reportTitle,
            description,
            files: files.map((f) => ({
              name: f.name,
              type: f.type,
              size: f.size,
            })),
            date: new Date().toISOString(),
          });

          setUploading(false);
          setFiles([]);
          setReportTitle("");
          setDescription("");
          setUploadProgress(0);
        }, 500);
      }
    }, 100);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6">Upload Medical Report</h2>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Report Title
        </label>
        <input
          type="text"
          value={reportTitle}
          onChange={(e) => setReportTitle(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md"
          placeholder="Enter a descriptive title for this report"
          required
        />
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Report Type
        </label>
        <select
          value={reportType}
          onChange={(e) => setReportType(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md"
          required
        >
          {reportTypes.map((type) => (
            <option key={type.id} value={type.id}>
              {type.label}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md"
          rows="3"
          placeholder="Add notes or description about this report"
        ></textarea>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Upload Files
        </label>

        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center ${
            files.length > 0 ? "border-gray-300" : "border-blue-300"
          }`}
        >
          {files.length === 0 ? (
            <div className="space-y-3">
              <div className="flex justify-center">
                <Upload size={36} className="text-blue-500" />
              </div>
              <div>
                <p className="font-medium text-gray-700">
                  Drag files here or click to browse
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Supported formats: PDF, JPG, PNG, DICOM
                </p>
              </div>
              <input
                type="file"
                onChange={handleFileChange}
                multiple
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
            </div>
          ) : (
            <div className="space-y-4">
              {files.map((file) => (
                <div
                  key={file.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-md"
                >
                  <div className="flex items-center">
                    {file.preview ? (
                      <img
                        src={file.preview}
                        alt={file.name}
                        className="w-10 h-10 object-cover rounded mr-3"
                      />
                    ) : (
                      <div className="mr-3">{getFileIcon(file)}</div>
                    )}
                    <div>
                      <p
                        className="font-medium text-sm text-gray-800 truncate"
                        style={{ maxWidth: "200px" }}
                      >
                        {file.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {formatFileSize(file.size)}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFile(file.id)}
                    className="p-1 hover:bg-gray-200 rounded-full"
                    title="Remove file"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}

              <button
                onClick={() =>
                  document.querySelector('input[type="file"]').click()
                }
                className="text-blue-600 text-sm font-medium hover:text-blue-800"
              >
                + Add more files
              </button>

              <input
                type="file"
                onChange={handleFileChange}
                multiple
                className="hidden"
              />
            </div>
          )}
        </div>
      </div>

      {uploading && (
        <div className="mb-6">
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm font-medium text-gray-700">
              Uploading...
            </span>
            <span className="text-sm text-gray-500">{uploadProgress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full"
              style={{ width: `${uploadProgress}%` }}
            ></div>
          </div>
        </div>
      )}

      <div className="flex items-center justify-end space-x-3">
        <button
          type="button"
          className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
          disabled={uploading}
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handleUpload}
          disabled={files.length === 0 || !reportTitle || uploading}
          className={`px-4 py-2 rounded-md flex items-center ${
            files.length === 0 || !reportTitle || uploading
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          {uploading ? (
            <>
              <Clock size={18} className="mr-2" />
              Processing...
            </>
          ) : (
            <>
              <Upload size={18} className="mr-2" />
              Upload Report
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default ReportUploader;
