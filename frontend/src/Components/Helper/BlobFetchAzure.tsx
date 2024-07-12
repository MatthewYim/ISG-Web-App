import { useEffect, useState } from "react";
import { BlobServiceClient } from "@azure/storage-blob";

interface BlobData {
  name: string;
  url: string;
}

const BlobFetchAzure = (props: BlobData) => {
  const [blobs, setBlobs] = useState<BlobData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const account = process.env.AZURE_STORAGE_ACCOUNT; // get the storage account name from the .env file
  const sasToken = process.env.AZURE_STORAGE_SAS; // get the SAS token from the .env file
  const containerName = process.env.AZURE_STORAGE_CONTAINER; // get the container name from the .env file
  const blobServiceClient = new BlobServiceClient(
    `https://${account}.blob.core.windows.net/?${sasToken}`
  ); // create a blobServiceClient
  const containerClient =
    blobServiceClient.getContainerClient("test-isgwebapp"); // create a containerClient

  useEffect(() => {
    const fetchBlobs = async () => {
      if (!account || !sasToken || !containerName) {
        console.error("Missing Azure Storage credentials");
        return;
      }
      try {
        const blobServiceClient = new BlobServiceClient(
          `https://${account}.blob.core.windows.net/?${sasToken}`
        );
        const containerClient =
          blobServiceClient.getContainerClient(containerName);
        const blobItems = containerClient.listBlobsFlat();
        const urls: BlobData[] = [];
        for await (const blob of blobItems) {
          const tempBlockBlobClient = containerClient.getBlockBlobClient(
            blob.name
          );
          urls.push({ name: blob.name, url: tempBlockBlobClient.url });
        }
        setBlobs(urls);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlobs();
  }, [account, sasToken, containerName]);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {blobs.map((blob, index) => (
            <li key={index}>{blob.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BlobFetchAzure;
