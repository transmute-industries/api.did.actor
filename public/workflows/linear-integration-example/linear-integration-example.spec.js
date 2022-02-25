const { Engine } = require("bpmn-engine");
const { EventEmitter } = require("events");

const fs = require("fs");
const path = require("path");

const processXml = fs.readFileSync(
  path.resolve(__dirname, "./linear-integration-example.xml")
);

const handlers = require("./handlers");

describe("linear-integration-example", () => {
  it("entry summary with Transmute Certified Mill Test Report is compliant", (done) => {
    const engine = Engine({
      name: "Process_Flagged_For_Inspection",
      source: processXml,
    });
    const listener = new EventEmitter();
    // record all activity
    listener.on("activity.end", async (elementApi, engineApi) => {
      if (elementApi.content.output) {
        engineApi.environment.output.path =
          engineApi.environment.output.path || [];
        engineApi.environment.output.path.push({
          id: elementApi.id,
          output: elementApi.content.output,
          state: JSON.parse(
            JSON.stringify(await engineApi.getState(), null, 2)
          ),
        });
      }
    });

    // simulate user action via signal
    // normally we would resume a workflow,
    // and then use this to step to the next part
    listener.on("wait", async (elementApi) => {
      if (handlers[elementApi.id]) {
        elementApi.signal(await handlers[elementApi.id](elementApi));
      } else {
        throw new Error("No handler for: " + elementApi.id);
      }
    });

    engine.execute({
      listener,
      variables: {
        additionalDocumentationRequired: true,
      },
      services: {
        console,
      },
    });

    engine.on("end", (execution) => {
      // If you need to capture the output for use in a component
      setTimeout(() => {
        fs.writeFileSync(
          path.resolve(__dirname, "linear-integration-example.json"),
          JSON.stringify(execution.environment.output, null, 2)
        );
        done();
      }, 1 * 1000);
    });
  });
});
