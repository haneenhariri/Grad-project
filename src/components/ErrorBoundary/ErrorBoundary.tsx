import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { 
      hasError: false,
      error: null
    };
  }

  static getDerivedStateFromError(error: Error): State {
    // تحديث الحالة بحيث يتم عرض واجهة الخطأ في الرندر التالي
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // يمكنك تسجيل الخطأ في خدمة تسجيل الأخطاء هنا
    console.error('Error caught by ErrorBoundary:', error);
    console.error('Component stack:', errorInfo.componentStack);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      // يمكنك تخصيص واجهة الخطأ هنا
      return this.props.fallback || (
        <div className="p-6 bg-red-50 rounded-lg shadow-sm max-w-lg mx-auto my-8 text-center">
          <h2 className="text-xl font-semibold text-red-700 mb-3">Something went wrong</h2>
          <p className="text-gray-700 mb-4">
            We're sorry, but there was an error loading this component.
          </p>
          <p className="text-sm text-gray-500 mb-4">
            {this.state.error?.message}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;