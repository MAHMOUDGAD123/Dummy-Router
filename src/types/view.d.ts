declare namespace View {
  interface AbstractViewType {
    setTitle(title: string): void;
    getHTML(): Promise<string>;
    render(): Promise<void>;
  }

  type ViewConstructor = new () => AbstractViewType;
}
