import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/themes/translucent.css';

const TippyWrapper = ({ content, children }) => (
    <Tippy visible={!!content} placement="bottom" delay={500} theme="translucent" content={content}>
        <div className={`${content ? 'tippy-warning' : ''}`}>
            {children}
        </div>
    </Tippy>
);

export default TippyWrapper;
