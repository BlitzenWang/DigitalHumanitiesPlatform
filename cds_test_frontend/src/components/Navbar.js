/**
 * Navbar
 * CSS by Boostrap 5.0
 * Author: Ruize Li
 */
import styled from 'styled-components';
const NavBar1 = styled('div')(({ theme }) => ({
  backgroundColor: `rgba(87, 87, 87, 1)`,
  display: `flex`,
  position: `relative`,
  isolation: `isolate`,
  flexDirection: `row`,
  width: '100%',
  height: `25px`,
  justifyContent: `space-between`,
  alignItems: `center`,
  padding: `25px 24px`,
  boxSizing: `border-box`,
  overflow: `hidden`,
}));


const Title = styled('div')(({ theme }) => ({
  textAlign: `center`,
  whiteSpace: `nowrap`,
  fontSynthesis: `none`,
  color: `rgba(113, 165, 189, 1)`,
  fontStyle: `normal`,
  fontFamily: `DM Sans`,
  fontWeight: `700`,
  fontSize: `18px`,
  letterSpacing: `2px`,
  textDecoration: `none`,
  textTransform: `uppercase`,
  margin: `0px`,
}));

const ItemFrame = styled('div')({
  display: `flex`,
  position: `relative`,
  isolation: `isolate`,
  flexDirection: `row`,
  justifyContent: `flex-start`,
  alignItems: `center`,
  padding: `0px`,
  boxSizing: `border-box`,
  height: `20px`,
  margin: `0px 0px 0px 381px`,
});

const Item = styled('div')(({ theme }) => ({
  textAlign: `center`,
  whiteSpace: `nowrap`,
  fontSynthesis: `none`,
  color: `rgba(113, 165, 189, 1)`,
  fontStyle: `normal`,
  fontFamily: `DM Sans`,
  fontWeight: `700`,
  fontSize: `18px`,
  letterSpacing: `0px`,
  textDecoration: `none`,
  lineHeight: `18px`,
  textTransform: `capitalize`,
  margin: `0px`,
}));

const StyledLi = styled.li`
  list-style-type: none;
  margin-right: 20px;

`;

const Navbar = () => {
    
    return (
        <NavBar1>
            <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none">
                <Title>Colby Digital Studies</Title>
            </a>
            <ItemFrame>
                <StyledLi className="nav-item"><Item as="a" href="/">Home</Item></StyledLi>
                <StyledLi className="nav-item"><Item as="a" href="/teachingresearch">Teaching &amp; Research</Item></StyledLi>
                <StyledLi className="nav-item"><Item as="a" href="/database">Database</Item></StyledLi>
                <StyledLi className="nav-item"><Item as="a" href="/resources">Resources</Item></StyledLi>
                <StyledLi className="nav-item"><Item as="a" href="/about">About</Item></StyledLi>
                <StyledLi className="nav-item"><Item as="a" href="/admin">Admin</Item></StyledLi>
                <StyledLi className="nav-item"><div id="google_translate_element" /></StyledLi>
            </ItemFrame>
        </NavBar1>
    );
}



export default Navbar;
