import { basePath, path, pathWithQuery, query, toQuery, toQueryString } from "../lib/util/url";
import { addBaseTag, clearHistory } from "./test-helpers";

describe("url", () => {
	const {expect} = chai;
	let $base: HTMLBaseElement;

	before(() => {
		$base = addBaseTag();
	});
	beforeEach(async () => {
		$base.href = `/`;
	});
	after(() => {
		clearHistory();
	});

	it("[currentPath] should return the correct current path", () => {
		history.pushState(null, "", "");
		expect(path()).to.equal(`/`);

		history.pushState(null, "", "/");
		expect(path()).to.equal(`/`);

		history.pushState(null, "", "cool");
		expect(path()).to.equal(`/cool/`);

		history.pushState(null, "", "login/forgot-password");
		expect(path()).to.equal(`/login/forgot-password/`);
	});

	it("[currentPath] should return the correct current path and search", () => {
		history.pushState(null, "", "cool?");
		expect(pathWithQuery()).to.equal(`/cool/`);

		history.pushState(null, "", "cool?id=2");
		expect(pathWithQuery()).to.equal(`/cool/?id=2`);

		history.pushState(null, "", "login/forgot-password?user=test&forgot=true");
		expect(pathWithQuery()).to.equal(`/login/forgot-password/?user=test&forgot=true`);
	});

	it("[basepath] should return correct base path", () => {
		const basePaths = [
			[`/my/path/`, `/my/path/`],
			[`/my-other-path/index.html`, `/my-other-path/`],
			[`https://cdpn.io/boomboom/v2/index.html?key=iFrameKey-ca757c8e-dad1-d965-1aed-7cabdaa22462`, `/boomboom/v2/`],
		];

		for (const [path, expected] of basePaths) {
			$base.href = path;
			expect(basePath()).to.equal(expected);
		}
	});

	it("[query] should return the correct query", () => {
		history.pushState(null, "", "?key1=value1&key2=value2");
		expect(JSON.stringify(query())).to.equal(`{"key1":"value1","key2":"value2"}`);
	});

	it("[toQuery] should return the correct query object", () => {
		expect(JSON.stringify(toQuery("test=1234&redirect"))).to.equal(JSON.stringify({test: "1234", redirect: ""}))
	});

	it("[toQueryString] should return the correct query string", () => {
		expect(toQueryString({test: "1234", redirect: ""})).to.equal("test=1234&redirect");
	});
});
