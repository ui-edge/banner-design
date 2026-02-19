import { useState, useRef, useCallback } from "react";
import { fileToDataUrl } from "../utils/helpers";

/**
 * useFileUpload
 *
 * Manages a single hidden <input type="file"> that is reused for all upload
 * targets (bg, logo1, logo2, qr).  Returns a `triggerUpload(target)` function
 * and the ref to attach to the hidden input.
 *
 * @param {Function} onUploaded - called with (target, dataUrl) when a file is chosen
 * @returns {{ fileInputRef, triggerUpload }}
 */
export function useFileUpload(onUploaded) {
  const fileInputRef  = useRef(null);
  const [target, setTarget] = useState(null);

  /** Open the file picker for a given target label */
  const triggerUpload = useCallback((uploadTarget) => {
    setTarget(uploadTarget);
    // A tiny timeout lets React flush the state before the dialog opens
    setTimeout(() => fileInputRef.current?.click(), 0);
  }, []);

  const handleChange = useCallback(async (e) => {
    const file = e.target.files?.[0];
    if (file && target) {
      const url = await fileToDataUrl(file);
      onUploaded(target, url);
    }
    // Reset so the same file can be re-selected
    e.target.value = "";
  }, [target, onUploaded]);

  // Expose the JSX element so the consumer doesn't need to know the internals
  const FileInput = (
    <input
      ref={fileInputRef}
      type="file"
      accept="image/*"
      style={{ display: "none" }}
      onChange={handleChange}
    />
  );

  return { triggerUpload, FileInput };
}
