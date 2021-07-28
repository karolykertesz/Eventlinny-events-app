/* <input type="checkbox" id="nav-check" className={classes.navCheck} />
      <div className={classes.navHeader}>
        <div className={classes.navTitle}>
          <Link href={userS !== false ? "/events/first" : "#"}>Eventlinny</Link>
        </div>
      </div>

      <div className={classes.navBtn}>
        <label htmlFor="nav-check">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </label>
      </div>
      {userS !== false && (
        <div className={classes.navLinks}>
          <Link href="/chat/main">Chats</Link>
          <Link href="/events">All Events</Link>
          <Link href="/events/find">Find an Event</Link>
          <Link href="/events/archive">Archive</Link>
          <ButtonPop />
          <span className={classes.link} onClick={() => sout()}>
            Sign Out
          </span>
        </div>