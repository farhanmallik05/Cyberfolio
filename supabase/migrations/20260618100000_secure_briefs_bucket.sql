-- Drop old open anonymous upload policy
DROP POLICY IF EXISTS "Allow anonymous uploads to brief-attachments" ON storage.objects;

-- Create secure anonymous upload policy with size and MIME-type constraints
CREATE POLICY "Allow anonymous uploads to brief-attachments"
ON storage.objects FOR INSERT
TO public
WITH CHECK (
    bucket_id = 'brief-attachments'
    AND (
        -- Enforce file size limit of 10MB (10 * 1024 * 1024 = 10485760 bytes)
        (metadata->>'size')::int <= 10485760
    )
    AND (
        -- Limit to allowed file types: PDF, PNG, JPG/JPEG, ZIP
        (metadata->>'mimetype') IN (
            'application/pdf',
            'image/png',
            'image/jpeg',
            'application/zip',
            'application/x-zip-compressed'
        )
    )
);
