const { Engine } = require("bpmn-engine");
const { EventEmitter } = require("events");

const fs = require("fs");
const path = require("path");

const processXml = fs.readFileSync(
  path.resolve(__dirname, "./exclusive-gateway.xml")
);

const testWorkflow = (variables) => {
  return new Promise((resolve) => {
    const engine = Engine({
      name: "Process_IsNumberEven",
      source: processXml,
    });
    const listener = new EventEmitter();
    // listener.on("activity.start", api => {
    //   if (api.id === "EndEvent_0q6qume") {
    //     console.log(`<${api.id}> ending in even state.`);
    //   }
    //   if (api.id === "EndEvent_1x2j1bh") {
    //     console.log(`<${api.id}> ending in odd state.`);
    //   }
    // });
    engine.execute({
      listener,
      variables,
      services: {
        console,
        example: (data) => {
          console.log(data);
        },
      },
      extensions: {
        saveToEnvironmentOutput(activity, { environment }) {
          activity.on("end", (api) => {
            environment.output.path = environment.output.path || [];
            environment.output.path.push({
              id: api.id,
              name: api.name,
              output: api.content.output,
            });
          });
        },
      },
    });
    engine.on("end", (execution) => {
      execution.environment.output.path.pop();
      const result = {
        input: variables,
        output: execution.environment.output,
      };
      resolve(result);
    });
  });
};

describe("exclusive-gateway", () => {
  it("1 is odd", async () => {
    const input = {
      number: 1,
    };
    const result = await testWorkflow(input);
    expect(result.output.remainder).toBe(1);
    expect(result.output.path.pop().name).toBe("End with odd number");
    // console.log(JSON.stringify(result, null, 2));
  });

  it("2 is even", async () => {
    const input = {
      number: 2,
    };
    const result = await testWorkflow(input);
    expect(result.output.remainder).toBe(0);
    expect(result.output.path.pop().name).toBe("End with an even number");
    // console.log(JSON.stringify(result, null, 2));
  });
});
