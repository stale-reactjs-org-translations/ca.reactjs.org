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
>>>>>>> 3ff6fe871c6212118991ffafa5503358194489a0
