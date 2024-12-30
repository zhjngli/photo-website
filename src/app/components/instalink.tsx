import Link from 'next/link';

type InstaLinkProps = {
  // style: string;
  text: string;
};

export default function InstaLink(props: InstaLinkProps) {
  // onClick(): void {
  //   // window.gtag('event', 'click', {
  //   //   event_category: 'outbound',
  //   //   event_label: 'instagram',
  //   //   transport_type: 'beacon'
  //   // });
  // }
  return (
    <Link
      href="https://www.instagram.com/zhjngli/"
      target="_blank"
      rel="noreferrer noopener"
      // onClick={this.onClick}
      // className={this.props.style}
    >
      {props.text}
    </Link>
  );
}
