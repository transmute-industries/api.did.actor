import React, { Component } from "react";

// import PropTypes from "prop-types";
// import ModelViewerAppBar from "./ModelViewerAppBar";

function download(filename: any, text: any) {
  const element = document.createElement("a");
  element.setAttribute(
    "href",
    `data:text/plain;charset=utf-8,${encodeURIComponent(text)}`
  );
  element.setAttribute("download", filename);

  element.style.display = "none";
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

const { BpmnJS, $ }: any = window;

class ModelViewer extends Component {
  public bpmnModeler: any;
  public props: any;

  UNSAFE_componentWillMount() {
    setTimeout(() => {
      const bpmnModeler = new BpmnJS({
        container: "#bpmn-modeler-canvas",
        keyboard: {
          bindTo: window,
        },
      });

      this.bpmnModeler = bpmnModeler;
      const name = this.props.name || "linear-integration-example";
      const modelUri = `/workflows/${name}/${name}.xml`;

      $.get(
        modelUri,
        (bpmnXML: any) => {
          // import diagram
          bpmnModeler.importXML(bpmnXML, (err: any) => {
            if (err) {
              // eslint-disable-next-line
              console.error("could not import BPMN 2.0 diagram", err);
            } else {
              // access modeler components
              const canvas = bpmnModeler.get("canvas");
              // const overlays = bpmnModeler.get('overlays');
              // zoom to fit full viewport
              canvas.zoom("fit-viewport");
              // attach an overlay to a node
              // overlays.add("Process_1", "note", {
              //   position: {
              //     bottom: 0,
              //     right: 0
              //   },
              //   html: '<div class="diagram-note">Mixed up the labels?</div>'
              // });
              // // add marker
              // canvas.addMarker("Process_1", "needs-discussion");
            }
          });
        },
        "text"
      );
    }, 1 * 1000);
  }

  exportDiagram = () => {
    return new Promise((resolve, reject) => {
      this.bpmnModeler.saveXML({ format: true }, (err: any, xml: any) => {
        if (err) {
          // eslint-disable-next-line
          console.error("Could not save BPMN 2.0 diagram", err);
          return reject(err);
        }
        download("file", xml);
        return resolve(xml);
      });
    });
  };

  render() {
    return (
      <React.Fragment>
        {/* <ModelViewerAppBar
          doExportXml={() => {
            this.exportDiagram();
          }}
        /> */}
        <div id="modeler" style={{ height: "100%" }}>
          <div id="bpmn-modeler-canvas" style={{ height: "100%" }} />
        </div>
      </React.Fragment>
    );
  }
}

export default ModelViewer as any;
