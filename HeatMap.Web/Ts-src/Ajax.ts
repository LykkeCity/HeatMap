namespace Lykke {

    export class Ajax {

        static get(url: string, model?: any) {
            return $.ajax({ url: url, method: 'GET', data: model });
        }


    }
}
