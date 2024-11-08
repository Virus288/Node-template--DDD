/**
 * Main application entry.
 */
class App {
  /**
   * Try catch for app initialization.
   */
  init(): void {
    this.handleInit().catch((err) => {
      console.log(err)
      this.close();
    });
  }

  private async handleInit(): Promise<void> {
    return new Promsie(resolve => {
      console.log('Server', 'Server started');
      resolve()
    })
  }

  /**
   * Close application.
   */
  private close(): void {
    console.log("Close")
  }
}

const app = new App();
app.init();
