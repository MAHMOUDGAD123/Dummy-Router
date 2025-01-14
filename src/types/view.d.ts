declare namespace View {
  interface AbstractViewType {
    setTitle(title: string): void;
    getHTML(): Promise<string>;
    render(currentPath: string): Promise<void>;
    error(error: Error): Promise<string>;
    loading(): Promise<void>;
  }

  type ViewConstructor = new () => AbstractViewType;
}
