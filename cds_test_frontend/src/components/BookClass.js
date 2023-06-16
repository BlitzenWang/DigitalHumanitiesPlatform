import React, { useEffect, useRef, useState } from 'react';
import HTMLFlipBook from 'react-pageflip';
const Page = React.forwardRef((props, ref) => {
  return (
    <div className="page" ref={ref}>
      <div className="page-content">
        <img src={props.src} alt="" className="page-image" />
      </div>
    </div>
  );
});

class BookClass extends React.Component {
	constructor(props) {
		super(props);
		this.imgPaths = props.imgPaths;
		this.state = {
		page: 0,
		totalPage: 0,
		};
	}

	nextButtonClick = () => {
		this.flipBook.getPageFlip().flipNext();
	};

	prevButtonClick = () => {
		this.flipBook.getPageFlip().flipPrev();
	};

	onPage = (e) => {
		this.setState({
		page: e.data,
		});
	};

	componentDidMount() {
		this.setState({
		totalPage: this.flipBook.getPageFlip().getPageCount(),
		});
	}
	

	render() {
		return (
		<div>
			<HTMLFlipBook
			width={550}
			height={733}
			size="stretch"
			minWidth={315}
			maxWidth={1000}
			minHeight={400}
			maxHeight={1533}
			maxShadowOpacity={0.5}
			showCover={true}
			mobileScrollSupport={true}
			onFlip={this.onPage}
			onChangeOrientation={this.onChangeOrientation}
			onChangeState={this.onChangeState}
			className="demo-book"
			ref={(el) => (this.flipBook = el)}
			>

			{this.imgPaths.map((image, index) => (
          	<Page key={index} src={image.file_path} />
        	))}

			</HTMLFlipBook>

			<div className="container">
			<div>

				<button type="button" onClick={this.prevButtonClick}>
				Previous page
				</button>

				[<span>{this.state.page}</span> of
				<span>{this.state.totalPage}</span>]

				<button type="button" onClick={this.nextButtonClick}>
				Next page
				</button>

			</div>
			<div>

				State: <i>{this.state.state}</i>, orientation: <i>{this.state.orientation}</i>

			</div>
			</div>
		</div>
		);
	}
}

export default BookClass;
