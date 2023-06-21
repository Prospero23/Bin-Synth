// function Navbar(){
//     return(
//         <div className="navbar bg-base-100 fixed z-50" >
//   <div className="flex-1">
//     <a className="btn btn-ghost normal-case text-xl" href="/posts">Music App</a>
//   </div>
//   <div className="flex-none">
//     <ul className="menu menu-horizontal px-1">
//       <li><a>Link</a></li>
//       <li>
//         <details>
//           <summary>
//             User
//           </summary>
//           <ul className="p-2 bg-base-100">
//             <li><a>Profile</a></li>
//             <li><a>Logout</a></li>
//           </ul>
//         </details>
//       </li>
//     </ul>
//   </div>
// </div>
//     )
// }
// export default Navbar;

// //maybe add some js stuff
'use client'
import{ useEffect, useState } from 'react';

function Navbar() {
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [navbarVisible, setNavbarVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      setNavbarVisible(prevScrollPos > currentScrollPos);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos]);

  return (
    <div className={`navbar bg-base-100 fixed z-50 transition-opacity duration-400 ${navbarVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div className="flex-1">
        <a className="btn btn-ghost normal-case text-xl" href="/posts">Music App</a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li><a>Link</a></li>
          <li>
            <details>
              <summary>User</summary>
              <ul className="p-2 bg-base-100">
                <li><a>Profile</a></li>
                <li><a>Logout</a></li>
              </ul>
            </details>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;