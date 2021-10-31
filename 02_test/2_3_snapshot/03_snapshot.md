# 課題１
## スナップショットテストとは
まず、スナップショットとはその時点の状態を丸ごと切り取ったものです。

スナップショットテストとは、
・ある機能があり、<br>
・その瞬間を切り取った状態のテスト(スナップショット)をAとし、<br>
・その機能に変化を加え（改修など）<br>
・変更後の状態のテストをスナップショットをBとした場合に、<br>
・AとBで予期せず差異がある場合はfailを返すと言うものです。<br><br>

snapshotテストの方法<br>
https://tarosky.co.jp/tarog/4662

## スナップショットで防止できる不具合
・あるボタンコンポーネントにstateデータがあり、そのstateによりボタンカラーが変わる仕様があります。新しいstateが想定をしていないデータの場合に、あらかじめエラーを返し、カラーの設定をしていないことに気づけます。<br>
・ログインしないと表示されないヘッダーの表示のsnapshotがあれば、ログインの仕組みに変更が起きた場合に、あらかじめスナップショットで指定された表示との違いが確認可能です。<br>
・変更点を確認できるため、逆に「変更し漏れ」を防ぐことができます。<br>A、B、Cのコンポーネントに変更を実施した場合、A、B、Cにテスト結果の違いが生まれますが、A、Bしかテストで違いがない場合、Cは違いが起きていない→変更し漏れ　ということになります。

## スナップショットで防止できない不具合
・見た目上の変化がない場合。受け渡す引数が意図せず変わっても、見た目上が同じ場合はdiffが発生しないため、差分を拾うことができません。<br>
・バックエンドのデータはjestの対象外のため、snaopshot testでは拾えません。<br>
・出力の差分が大量な場合（1万行のコードを出力するテストの場合、違いがあってもわかりづらい）


# storybook snapshoto test構築手順
https://storybook.js.org/docs/react/workflows/snapshot-testing  の引用<br>

1.addon-storyshotsをインストール<br>
2.src（test対象のコンポーネントがあるディレクトリ）の中に　「storybook.test.js」を作成します。中の記述は下記の通り。<br>
import initStoryshots from '@storybook/addon-storyshots';<br>
initStoryshots();<br>

3.yarn test storybook.test.jsを実行

## snapshotで作られる情報について
yarn test storybook.test.js　でtest を実行すると、storybookの
「__snapshots__ 」内の「storybook.test.js.snap」に、<br>
### 「exports[ Storyshots XXXXXX（story名）」="htmlタグ"<br>
というふうに、作ったstoryごとにsnapshotが作成されます。<br>
storyの内容を変更すると、snapshotoを起動中であれば、差分を書き出してくれます。
またsnapshotを起動しているターミナル上で「u」を押すと、変更部分がsnapshotにも反映されます。



# クイズ
storyに変更を行い、ターミナル上で出力されたtest結果のdiffを確認する場合、<br>
component内にconsole.logを記述しているとそれらもtest内に出力され、<br>
差分の見通しが悪くなります。（自分の場合console.logされたものの上にdiffが出力されました。）<br>

「console.logを削除する」以外にtest上で出さないようにする方法をあげてください。
(ヒント；console.logしている近くでjestでなんやかんやしました。）

ただし、自分が見つけた方法ではテスト側のconsoleは消えましたが、そのコンポーネントを利用しているアプリ側がエラーになってしまいました。。のであくまでdiffを見たい時の応急処置という感じです。
もっといい方法があれば知りたいです！w



