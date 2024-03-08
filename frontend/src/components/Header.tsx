interface HeaderProps {
    text: string;
  }
  
  const Header =({text}:HeaderProps)=>{
    return <header>
    <h1> {text} </h1>
  </header>
  };    

export default Header;