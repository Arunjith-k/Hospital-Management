import React, { useState } from "react";
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Link,
  Image,
  AlertCircle,
} from "lucide-react";

const MedicalNoteEditor = ({ patientId, initialNote = "", onSave }) => {
  const [note, setNote] = useState(initialNote);
  const [activeTab, setActiveTab] = useState("write");

  // Template options for quick insertion
  const templates = [
    {
      name: "SOAP Note",
      template: "## Subjective\n\n## Objective\n\n## Assessment\n\n## Plan\n",
    },
    {
      name: "Follow-up Visit",
      template:
        "## Reason for Visit\n\n## Progress since last visit\n\n## Current symptoms\n\n## Treatment adjustments\n\n## Next steps\n",
    },
    {
      name: "Physical Exam",
      template:
        "## Vitals\n\n## General appearance\n\n## HEENT\n\n## Cardiovascular\n\n## Respiratory\n\n## Gastrointestinal\n\n## Musculoskeletal\n\n## Neurological\n",
    },
  ];

  const insertTemplate = (template) => {
    setNote(template);
  };

  const insertFormatting = (format) => {
    let insertText = "";
    let selectionStart = document.getElementById("noteEditor").selectionStart;
    let selectionEnd = document.getElementById("noteEditor").selectionEnd;
    let selectedText = note.substring(selectionStart, selectionEnd);

    switch (format) {
      case "bold":
        insertText = `**${selectedText}**`;
        break;
      case "italic":
        insertText = `*${selectedText}*`;
        break;
      case "list":
        insertText = `\n- ${selectedText}`;
        break;
      case "ordered-list":
        insertText = `\n1. ${selectedText}`;
        break;
      case "link":
        insertText = `[${selectedText}](url)`;
        break;
      case "heading":
        insertText = `\n## ${selectedText}`;
        break;
      default:
        insertText = selectedText;
    }

    if (selectedText) {
      setNote(
        note.substring(0, selectionStart) +
          insertText +
          note.substring(selectionEnd)
      );
    } else {
      setNote(
        note.substring(0, selectionStart) +
          insertText +
          note.substring(selectionStart)
      );
    }
  };

  const renderMarkdownPreview = () => {
    // This is a very basic markdown renderer for preview purposes
    // In a real application, you would use a proper markdown library
    let preview = note
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.*?)\*/g, "<em>$1</em>")
      .replace(/## (.*?)\n/g, "<h2>$1</h2>")
      .replace(/\n- (.*)/g, "<ul><li>$1</li></ul>")
      .replace(/\n\d\. (.*)/g, "<ol><li>$1</li></ol>")
      .replace(/\n/g, "<br />");

    return <div dangerouslySetInnerHTML={{ __html: preview }} />;
  };

  const handleSave = () => {
    onSave({
      patientId,
      content: note,
      timestamp: new Date().toISOString(),
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6">Medical Note</h2>

      <div className="mb-4">
        <div className="flex border-b">
          <button
            className={`px-4 py-2 font-medium ${
              activeTab === "write"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-600"
            }`}
            onClick={() => setActiveTab("write")}
          >
            Write
          </button>
          <button
            className={`px-4 py-2 font-medium ${
              activeTab === "preview"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-600"
            }`}
            onClick={() => setActiveTab("preview")}
          >
            Preview
          </button>
          <button
            className={`px-4 py-2 font-medium ${
              activeTab === "templates"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-600"
            }`}
            onClick={() => setActiveTab("templates")}
          >
            Templates
          </button>
        </div>
      </div>

      {activeTab === "write" && (
        <>
          <div className="flex items-center mb-3 space-x-2 border-b pb-3">
            <button
              className="p-2 hover:bg-gray-100 rounded"
              onClick={() => insertFormatting("bold")}
              title="Bold"
            >
              <Bold size={18} />
            </button>
            <button
              className="p-2 hover:bg-gray-100 rounded"
              onClick={() => insertFormatting("italic")}
              title="Italic"
            >
              <Italic size={18} />
            </button>
            <button
              className="p-2 hover:bg-gray-100 rounded"
              onClick={() => insertFormatting("list")}
              title="Bullet List"
            >
              <List size={18} />
            </button>
            <button
              className="p-2 hover:bg-gray-100 rounded"
              onClick={() => insertFormatting("ordered-list")}
              title="Numbered List"
            >
              <ListOrdered size={18} />
            </button>
            <button
              className="p-2 hover:bg-gray-100 rounded"
              onClick={() => insertFormatting("link")}
              title="Link"
            >
              <Link size={18} />
            </button>
            <button
              className="p-2 hover:bg-gray-100 rounded"
              onClick={() => insertFormatting("heading")}
              title="Heading"
            >
              H2
            </button>
          </div>

          <textarea
            id="noteEditor"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="w-full h-64 p-3 border border-gray-300 rounded-md font-mono"
            placeholder="Enter your medical notes here..."
          ></textarea>
        </>
      )}

      {activeTab === "preview" && (
        <div className="w-full h-64 p-3 border border-gray-300 rounded-md bg-gray-50 overflow-y-auto">
          {note ? (
            renderMarkdownPreview()
          ) : (
            <p className="text-gray-500 italic">Preview will appear here</p>
          )}
        </div>
      )}

      {activeTab === "templates" && (
        <div className="w-full h-64 p-3 border border-gray-300 rounded-md overflow-y-auto">
          <h3 className="font-medium text-lg mb-3">Select a template</h3>
          <div className="space-y-3">
            {templates.map((tmpl, index) => (
              <div
                key={index}
                className="p-3 border border-gray-200 rounded-md hover:bg-gray-50 cursor-pointer"
                onClick={() => insertTemplate(tmpl.template)}
              >
                <h4 className="font-medium">{tmpl.name}</h4>
                <p className="text-sm text-gray-500 mt-1">
                  {tmpl.template.substring(0, 50)}...
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center text-yellow-600">
          <AlertCircle size={18} className="mr-2" />
          <span className="text-sm">
            Notes are part of the permanent medical record
          </span>
        </div>
        <div className="flex items-center space-x-3">
          <button
            type="button"
            className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Save Note
          </button>
        </div>
      </div>
    </div>
  );
};

export default MedicalNoteEditor;
