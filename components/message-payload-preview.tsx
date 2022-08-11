import { verifyCredential } from "../vc-api";
import { verifyPresentation } from "../vc-api";

import { CredentialPreview } from "./credential-preview";
import { PresentationPreview } from "./presentation-preview";

const MessagePayloadPreview = ({ payload }: any) => {
  if (typeof payload === "string") {
    let parsedJwtPayload = null;
    try {
      const payloadString = Buffer.from(
        payload.split(".")[1],
        "base64"
      ).toString();

      parsedJwtPayload = JSON.parse(payloadString);
      // console.log(payload);
      // console.log(payloadString);
      // console.log(parsedJwtPayload);
    } catch (e) {
      console.error(e);
      return <></>;
    }

    if (parsedJwtPayload.vc) {
      return (
        <CredentialPreview
          credential={payload}
          verifyCredential={verifyCredential}
        />
      );
    }

    if (parsedJwtPayload.vp) {
      return (
        <PresentationPreview
          presentation={payload}
          verifyPresentation={verifyPresentation}
        />
      );
    }
  } else {
    return (
      <>
        {payload.type === "VerifiablePresentation" ||
        payload.type.includes("VerifiablePresentation") ? (
          <PresentationPreview
            presentation={payload}
            verifyPresentation={verifyPresentation}
          />
        ) : (
          <CredentialPreview
            credential={payload}
            verifyCredential={verifyCredential}
          />
        )}
      </>
    );
  }
  return <>Malformed Data</>;
};

export default MessagePayloadPreview;
