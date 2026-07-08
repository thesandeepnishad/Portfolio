import React from 'react'

class ErrorBoundary extends React.Component {
  state = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || <div className="w-full h-full min-h-96 bg-black-300/50 rounded-2xl flex items-center justify-center" />
    }
    return this.props.children
  }
}

export default ErrorBoundary
