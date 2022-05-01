import * as path from 'path';
import * as fs from 'fs';
import Handlebars from 'handlebars';
import { Service } from 'typedi';

@Service()
export class MailGenerator {
  generateHtmlContent(templateFile: string, context: object): string {
    const emailTemplateSource = fs.readFileSync(
      path.join(__dirname + '/Templates/' + templateFile + '.hbs'),
      'utf-8'
    );

    const template = Handlebars.compile(emailTemplateSource);

    return template(context);
  }
}
