function Mailbox(props) {
  const unreadMessages = props.unreadMessages;
  return (
    <div>
      <h1>Hallo!</h1>
      {unreadMessages.length > 0 &&
      <h2>
        Du hast {unreadMessages.length} ungelesene Nachrichten.
      </h2>
      }
    </div>
  );
}

const messages = ['React', 'Re: React', 'Re:Re: React'];
ReactDOM.render(
  <Mailbox unreadMessages={messages} />,
  document.getElementById('root')
);