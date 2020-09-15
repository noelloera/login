import React from "react";

const Password = React.forwardRef((props, ref) => {
  class Password extends React.Component {
    constructor(props) {
      super(props);
    }
    render() {
      return (
        <div>
          <input 
            ref={ref} {...props} 
            placeholder="enter password"
            type="text" className="passwordInput" />
        </div>
      );
    }
  }
  return <Password />;
});

export default Password;
