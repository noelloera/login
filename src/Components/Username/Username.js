import React from "react";

const User = React.forwardRef((props, ref) => {
  class User extends React.Component {
    constructor(props) {
      super(props);
    }
    render() {
      return (
        <div>
          <input 
            ref={ref} {...props} 
            placeholder="enter username"
            type="text" className="usernameInput" />
        </div>
      );
    }
  }
  return <User />;
});

export default User;
