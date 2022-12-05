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
>>>>>>> cb9854a54984ef1288a8a2b8754897b15e75f433
