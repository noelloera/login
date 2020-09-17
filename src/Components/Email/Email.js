import React from "react";

const Email = React.forwardRef((props, ref) => {
  class Email extends React.Component {
    constructor(props) {
      super(props);
    }
    render() {
      return (
        <div>
          <input 
          value={props.email}
            ref={ref} {...props} 
            placeholder="enter email"
            type="text" className="emailInput" />
        </div>
      );
    }
  }
  return <Email />;
});

export default Email;