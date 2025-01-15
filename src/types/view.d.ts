declare namespace View {
  interface AbstractViewType {
    setTitle(title: string): void;
    getHTML(): Promise<string>;
    render(currentPath: string): Promise<void>;
    error(error: Error): Promise<string>;
    loading(currentPath: string): Promise<void>;
    canRenderLoadingState: boolean;
    loadingStateRenderDelay: number; // ms
  }

  type ViewConstructor = new () => AbstractViewType;
}
