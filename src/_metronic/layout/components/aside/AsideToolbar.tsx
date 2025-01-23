import { Session } from 'inspector';
import { useAuth } from '../../../../app/modules/auth';
import { KTIcon, toAbsoluteUrl } from '../../../helpers';
import { HeaderUserMenu, Search } from '../../../partials';

const AsideToolbar = () => {
  const { currentUser } = useAuth();

  // Inline styles for the right-side shadow effect
  const containerStyle = {
    backgroundColor: '#0a1d2e',
    boxShadow: '5px 0 10px rgba(0, 0, 0, 0.2)', // Right-side shadow
    borderRadius: '8px', // Optional: Smooth edges
    padding: '20px',
  };

  // Inline styles for increasing font sizes
  const usernameStyle = {
    fontSize: '1rem', // Adjust font size as needed
  };

  const onlineStatusStyle = {
    fontSize: '1rem', // Slightly increase the size for "online" status
  };

  return (
    <>
      {/*begin::User*/}
      <div className="aside-user d-flex align-items-sm-center justify-content-center py-5" style={containerStyle}>
        {/*begin::Symbol*/}
        <div className="symbol symbol-50px">
          <img src="https://cdn-icons-png.freepik.com/512/7718/7718888.png" alt="" />
        </div>
        {/*end::Symbol*/}

        {/*begin::Wrapper*/}
        <div className="aside-user-info flex-row-fluid flex-wrap ms-5">
          {/*begin::Section*/}
          <div className="d-flex">
            {/*begin::Info*/}
            <div className="flex-grow-1 me-2">
              {/*begin::Username*/}
              <a href="#" className="text-dark text-hover-primary fs-6 fw-bold" style={usernameStyle}>
                {currentUser?.first_name} {currentUser?.last_name}
              </a>
              {/*end::Username*/}

              {/*begin::Description*/}
              <span className="text-muted fw-bold d-block fs-8 mb-1">User</span>
              {/*end::Description*/}

              {/*begin::Label*/}
              <div className="d-flex align-items-center text-success fs-9">
                <span className="bullet bullet-dot bg-success me-1"></span>
                <span style={onlineStatusStyle}>online</span>
              </div>
              {/*end::Label*/}
            </div>
            {/*end::Info*/}

            {/*begin::User menu*/}
            <div className="me-n2">
              {/*begin::Action*/}
              <a
                href="#"
                className="btn btn-icon btn-sm btn-active-color-primary mt-n2"
                data-kt-menu-trigger="click"
                data-kt-menu-placement="bottom-start"
                data-kt-menu-overflow="false"
              >
                <KTIcon iconName="setting-2" className="text-muted fs-1" />
              </a>

              <HeaderUserMenu />
              {/*end::Action*/}
            </div>
            {/*end::User menu*/}
          </div>
          {/*end::Section*/}
        </div>
        {/*end::Wrapper*/}
      </div>
      {/*end::User*/}

      {/*begin::Aside search*/}
      <div className="aside-search py-5">
        <Search />
      </div>
      {/*end::Aside search*/}
    </>
  );
};

export { AsideToolbar };
