class HelloMessage extends React.Component {
  render() {
<<<<<<< HEAD
    return (
      <div>
        Hola {this.props.name}
      </div>
    );
  }
}

ReactDOM.render(
  <HelloMessage name="Júlia" />,
  document.getElementById('hello-example')
);
=======
    return <div>Hello {this.props.name}</div>;
  }
}

root.render(<HelloMessage name="Taylor" />);
>>>>>>> f67fa22cc1faee261f9e22449d90323e26174e8e
