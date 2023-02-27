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
>>>>>>> b0ccb47f33e52315b0ec65edb9a49dc4910dd99c
