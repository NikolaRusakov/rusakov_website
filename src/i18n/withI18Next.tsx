import React, { Component } from "react";
import { I18nextProvider } from "react-i18next";
import LocaleContext from "../localeContext";

import setupI18next from "./setupI18Next";

const withI18next = () => Comp => {
    class I18nHOC extends Component {
        constructor(props) {
            super(props);

            this.i18n = setupI18next();
            this.changeLanguage();
        }

        changeLanguage = () => {
            const { pageContext } = this.props;

            this.addResources(pageContext);
            this.i18n.changeLanguage(pageContext.locale);
        };

        // @see https://www.i18next.com/overview/api#resource-handling
        // `translation` is the default NS we use consistently.
        addResources = pageContext => {
            if (
                pageContext &&
                pageContext.localeResources &&
                pageContext.localeResources.translation
            ) {
                const {
                    locale: lng,
                    localeResources: { translation }
                } = pageContext;

                if (!this.i18n.hasResourceBundle(lng, "translation")) {
                    this.i18n.addResourceBundle(lng, "translation", translation);
                }
            }
        };

        componentDidUpdate(prevProps) {
            if (this.props.pageContext.locale !== prevProps.pageContext.locale) {
                this.changeLanguage();
            }
        }

        render() {
            return (
                <LocaleContext.Provider
                    value={{ locale: this.props.pageContext.locale }}
                >
                    <I18nextProvider i18n={this.i18n}>
                        <Comp {...this.props} />
                    </I18nextProvider>
                </LocaleContext.Provider>
            );
        }
    }

    return I18nHOC;
};

export default withI18next;
