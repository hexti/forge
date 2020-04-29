class HandleSelectionExtension extends Autodesk.Viewing.Extension {
  constructor(viewer, options) {
      super(viewer, options);
      this._group = null;
      this._button = null;
  }

  load() {
      console.log('HandleSelectionExtension has been loaded');
      return true;
  }

  unload() {
      // Clean our UI elements if we added any
      if (this._group) {
          this._group.removeControl(this._button);
          if (this._group.getNumberOfControls() === 0) {
              this.viewer.toolbar.removeControl(this._group);
          }
      }
      console.log('HandleSelectionExtension has been unloaded');
      return true;
  }

  onToolbarCreated() {
      // Create a new toolbar group if it doesn't exist
      this._group = this.viewer.toolbar.getControl('allMyAwesomeExtensionsToolbar');
      if (!this._group) {
          this._group = new Autodesk.Viewing.UI.ControlGroup('allMyAwesomeExtensionsToolbar');
          this.viewer.toolbar.addControl(this._group);
      }

      // Add a new button to the toolbar group
      this._button = new Autodesk.Viewing.UI.Button('handleSelectionExtensionButton');
      this._button.onClick = (ev) => {
        // Get current selection
        const selection = this.viewer.getSelection();
        this.viewer.clearSelection();
        // Anything selected?
        console.log(selection)
        if (selection.length > 0) {
            let isolated = [];
            // Iterate through the list of selected dbIds
            selection.forEach((dbId) => {
                // Get properties of each dbId
                this.viewer.getProperties(dbId, (props) => {
                    // Output properties to console
                    console.log(props);
                    // Ask if want to isolate
                    // if (confirm(`Isolate ${props.name} (${props.dbId})?`)) {
                    //     isolated.push(dbId);
                    //     this.viewer.isolate(isolated);
                    // }
                    let datasets = ''
                    if(props.dbId == 32){
                        datasets = [{
                                      label: 'Sensor Information',
                                      backgroundColor: 'rgb(255, 99, 132)',
                                      borderColor: 'rgb(255, 99, 132)',
                                      data: [0, 3, 15, 22, 2, 15, 45]
                                  }]
                        createChart(datasets)

                        $('#myIframe').attr('src', 'http://www.hexti.com.br/repositorio/Sondagem_SP_01.pdf')
                        $('#openFile').attr('href', 'https://concrematcorp.sharepoint.com/sites/AutodeskForge/Documentos%20Compartilhados/Forms/AllItems.aspx?id=%2Fsites%2FAutodeskForge%2FDocumentos%20Compartilhados%2FProjetos%2FSondagens%2FSondagem%20SP%2001%2Epdf&parent=%2Fsites%2FAutodeskForge%2FDocumentos%20Compartilhados%2FProjetos%2FSondagens')
                    }

                    if(props.dbId == 21){
                        datasets = [{
                                      label: 'Sensor Information',
                                      backgroundColor: 'rgb(255, 99, 132)',
                                      borderColor: 'rgb(255, 99, 132)',
                                      data: [0, 10, 5, 2, 20, 30, 45]
                                  }]
                        createChart(datasets)

                        $('#myIframe').attr('src', 'http://www.hexti.com.br/repositorio/Prancha_XXX-XXX.pdf')
                        $('#openFile').attr('href', 'https://concrematcorp.sharepoint.com/sites/AutodeskForge/Documentos%20Compartilhados/Forms/AllItems.aspx?id=%2Fsites%2FAutodeskForge%2FDocumentos%20Compartilhados%2FProjetos%2FProjetos%20Instrumenta%C3%A7%C3%A3o%2FPrancha%20XXX%2DXXX%2Epdf&parent=%2Fsites%2FAutodeskForge%2FDocumentos%20Compartilhados%2FProjetos%2FProjetos%20Instrumenta%C3%A7%C3%A3o')
                    }

                    if(props.dbId == 27){
                        datasets = [{
                                      label: 'Sensor Information',
                                      backgroundColor: 'rgb(255, 99, 132)',
                                      borderColor: 'rgb(255, 99, 132)',
                                      data: [0, 20, 2, 5, 2, 30, 70]
                                  }]
                        createChart(datasets)

                        $('#myIframe').attr('src', 'http://www.hexti.com.br/repositorio/Sondagem_SP_01.pdf')
                        $('#openFile').attr('href', 'http://www.hexti.com.br/repositorio/Sondagem_SP_01.pdf')
                    }
                });
            });
        } else {
            // If nothing selected, restore
            this.viewer.isolate(0);
        }

      };
      this._button.setToolTip('Instrumentation Panel');
      this._button.addClass('handleSelectionExtensionIcon');
      this._group.addControl(this._button);
  }
}

Autodesk.Viewing.theExtensionManager.registerExtension('HandleSelectionExtension', HandleSelectionExtension);
