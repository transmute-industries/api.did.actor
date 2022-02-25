/* eslint-disable no-useless-computed-key */

const handlers = {
  ["UserTask_CreateEntrySummary"]: (elementApi) => {
    const documents = ["Bill of Lading"];
    elementApi.environment.variables.documents = documents;
    return {
      documents,
    };
  },
  ["UserTask_ProcessEntrySummary"]: (elementApi) => {
    const additionalDocumentationRequired =
      elementApi.environment.variables.documents.length === 1;

    elementApi.environment.variables.additionalDocumentationRequired =
      additionalDocumentationRequired;

    return {
      additionalDocumentationRequired,
    };
  },
  ["UserTask_ProvideAdditionalDocumentation"]: (elementApi) => {
    const documents = [
      "Mill Test Report Certificate",
      ...elementApi.environment.variables.documents,
    ];
    elementApi.environment.variables.documents = documents;
    return {
      documents,
    };
  },
  ["UserTask_MarkEntryAsCompliant"]: (elementApi) => {
    const documents = [
      "Entry Approval",
      ...elementApi.environment.variables.documents,
    ];
    elementApi.environment.variables.documents = documents;
    return {
      documents,
    };
  },
};

module.exports = handlers;
